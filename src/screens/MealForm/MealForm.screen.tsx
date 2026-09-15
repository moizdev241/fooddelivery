import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomButton, CustomTextInput, Txt } from '../../components/atoms';
import { RootStackParamList } from '../../navigation/types';
import { isNonEmpty, isValidPrice } from '../../utils/validations';
import { createMeal, updateMeal } from '../../services/mealService';
import { theme } from '../../theme';
import styles from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'MealForm'>;

export default function MealForm({ route, navigation }: Props) {
  const { restaurantId, meal: editing } = route.params ?? ({} as any);

  const [name, setName] = useState(editing?.name ?? '');
  const [description, setDescription] = useState(editing?.description ?? '');
  const [price, setPrice] = useState(editing ? String(editing.price) : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async () => {
    setError('');
    if (!isNonEmpty(name)) {
      setError('Enter a meal name.');
      return;
    }
    if (!isValidPrice(price)) {
      setError('Enter a valid price.');
      return;
    }

    setLoading(true);
    try {
      const numericPrice = Number(price);
      if (editing) {
        await updateMeal(restaurantId, editing.id, name.trim(), description.trim(), numericPrice);
      } else {
        await createMeal(restaurantId, name.trim(), description.trim(), numericPrice);
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
            <Feather name="coffee" size={24} color={theme.palette.primary} />
          </View>
          <Txt style={styles.title}>{editing ? 'Edit Meal' : 'New Meal'}</Txt>
          <Txt style={styles.subtitle}>
            {editing ? 'Update this item on your menu.' : 'Add a new item to your menu.'}
          </Txt>

          {error ? <Txt style={styles.error}>{error}</Txt> : null}

          <CustomTextInput
            label="Name"
            placeholder="e.g. Margherita Pizza"
            value={name}
            onChangeText={setName}
          />
          <CustomTextInput
            label="Description"
            placeholder="e.g. Fresh basil, mozzarella, tomato sauce"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={3}
          />
          <CustomTextInput
            label="Price"
            placeholder="0.00"
            keyboardType="decimal-pad"
            value={price}
            onChangeText={setPrice}
          />

          <CustomButton
            title={editing ? 'Save Changes' : 'Add Meal'}
            icon={editing ? 'check' : 'plus'}
            onPress={onSubmit}
            loading={loading}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
