import React from "react";
import { FlatList, TouchableOpacity, Text } from "react-native";
import { styles } from "./SortComponentStyles";
import { Strings } from "../../constants/Strings";

export type SortType = "liked" | "release" | "rating";

interface SortOption {
  label: string;
  value: SortType;
}

interface SortComponentProps {
  sortType: SortType | null;
  onSortChange: (sortType: SortType | null) => void;
  excludeSorts?: SortType[];
}

const sortOptions: SortOption[] = [
  { label: Strings.SORT_LIKED, value: "liked" },
  { label: Strings.SORT_RELEASE_DATE, value: "release" },
  { label: Strings.SORT_RATING, value: "rating" },
];

const SortComponent: React.FC<SortComponentProps> = ({
  sortType,
  onSortChange,
  excludeSorts = [],
}) => {
  const filteredSortOptions = sortOptions.filter(
    (option) => !excludeSorts.includes(option.value)
  );

  const renderItem = ({ item }: { item: SortOption }) => (
    <TouchableOpacity
      style={[styles.button, sortType === item.value && styles.activeButton]}
      onPress={() => onSortChange(sortType === item.value ? null : item.value)}
    >
      <Text style={[styles.text, sortType === item.value && styles.activeText]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={filteredSortOptions}
      renderItem={renderItem}
      keyExtractor={(item) => item.value}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

export default SortComponent;
