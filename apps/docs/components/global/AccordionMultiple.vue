<template>
  <VAccordion v-model:activeIndex="activeIndex" multiple>
    <VAccordionItem header="A Brief History of Time">
      A Brief History of Time, written by the famous physicist Stephen Hawking, is a popular science book that aims to
      explain complex subjects like the Big Bang, black holes, and the nature of time itself in a manner accessible to a
      wide audience. The book, first published in 1988, became a bestseller and has since been translated into multiple
      languages. It has inspired countless readers to delve deeper into the fascinating world of cosmology and theoretical
      physics.
    </VAccordionItem>
    <VAccordionItem header="The Catcher in the Rye">
      The Catcher in the Rye is a classic novel by J.D. Salinger, published in 1951. It tells the story of Holden
      Caulfield, a disenchanted and rebellious teenager who wanders around New York City after being expelled from his
      prep school. The novel explores themes such as teenage angst, alienation, and the loss of innocence. Over the years,
      it has become a defining work of American literature and has influenced generations of readers.
    </VAccordionItem>
</VAccordion></template>

<script lang="ts" setup>
const activeIndex = ref([1]);
</script>