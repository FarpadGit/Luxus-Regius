<template>
  <template v-if="editMode">
    <PlasticInput
      v-model="text"
      :class="classes"
      :inner-classes="`${twTextAlign()}`"
      :placeholder="placeholder"
      :auto-focus="autoFocus"
      :use-text-area="useTextArea"
      @on-blur="(e: FocusEvent, reset?: boolean) => $emit('onBlur', e, reset)"
    />
  </template>
  <p 
    v-else-if="text !== '' || !optional"
    :class="`${text === '' ? 'invalid' : ''} ${twTextAlign()} ${classes}`"
  >
    {{ text !== "" ?  text : !reactiveMenu.isMenuEditable ? "" : placeholder }}
  </p>
</template>

<script setup lang="ts">
  type textAlignType = "center" | "left" | "right" | "indented";
  const { 
    classes = "",
    editMode, 
    placeholder, 
    textAlign = "center", 
    autoFocus = false, 
    optional = false, 
    useTextArea = false 
  } = defineProps<{
    classes?: string,
    editMode: boolean,
    placeholder: string, 
    textAlign?: textAlignType,
    autoFocus?: boolean,
    optional?: boolean,
    useTextArea?: boolean
  }>();
  const emit = defineEmits<{onBlur: [e: FocusEvent, reset?: boolean]}>();
  const text = defineModel<string>();

  const reactiveMenu = useState<reactiveMenuState>("reactiveMenuState").value;

  const twTextAlign = () => {
  switch (textAlign) {
    case "left": return "text-left";
    case "center": return "text-center";
    case "right": return "text-right";
    case "indented": return "text-left indent-6";
    default: return "";
  }
}
</script>

<style scoped>
  p {
    user-select: none;
    overflow: hidden;

    &.invalid {
      color: var(--color-menu-faded-text);
    }
  }
</style>