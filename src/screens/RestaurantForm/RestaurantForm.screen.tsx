import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomButton, CustomTextInput, Txt } from '../../components/atoms';
import { RootStackParamList } from '../../navigation/types';
import { isNonEmpty } from '../../utils/validations';
import { createRestaurant, updateRestaurant } from '../../services/restaurantService';
import { useAppSelector } from '../../redux/hooks';
import { theme } from '../../theme';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'RestaurantForm'>;

export default function RestaurantForm({ route, navigation }: Props) {
  const editing = route.params?.restaurant;
  const profile = useAppSelector(state => state.user.profile);

  const [name, setName] = useState(editing?.name ?? '');
  const [description, setDescription] = useState(editing?.description ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async () => {
    setError('');
    if (!isNonEmpty(name)) {
      setError('Enter a restaurant name.');
      return;
    }
    if (!isNonEmpty(description)) {
      setError('Describe the type of food this restaurant serves.');
      return;
    }
    if (!profile) return;

    setLoading(true);
    try {
      if (editing) {
        await updateRestaurant(editing.id, name.trim(), description.trim());
      } else {
        await createRestaurant(profile.uid, name.trim(), description.trim());
      }
      navigation.goBack();
    } catch (e: any) {
      setError(e?.message ?? 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.iconBadge}>
            <Feather name="home" size={24} color={theme.palette.primary} />
          </View>
          <Txt style={styles.title}>{editing ? 'Edit Restaurant' : 'New Restaurant'}</Txt>
          <Txt style={styles.subtitle}>
            {editing
              ? 'Update your restaurant details.'
              : 'Tell customers what your restaurant serves.'}
          </Txt>

          {error ? <Txt style={styles.error}>{error}</Txt> : null}

          <CustomTextInput
            label="Name"
            placeholder="e.g. Golden Spoon"
            value={name}
            onChangeText={setName}
          />
          <CustomTextInput
            label="Food type / description"
            placeholder="e.g. Italian, wood-fired pizza and pasta"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />

          <CustomButton
            title={editing ? 'Save Changes' : 'Create Restaurant'}
            icon={editing ? 'check' : 'plus'}
            onPress={onSubmit}
            loading={loading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
