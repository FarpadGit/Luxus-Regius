<template>
  <div  
    v-if="reactiveMenu.isMenuEditable"
    :class="`edit-buttons ${spacing === 'close' ? 'right-0 translate-x-full max-sm:translate-x-0' : spacing === 'far' ? '-right-[2.5%]' : '-right-[5.5%]'}`" 
    @mouseleave="showOptions = false"
    @keypress="(e: Event) => e.stopPropagation()"
  >
    <button 
      class="bordered"
      @click.stop="showOptions = true" 
      @mouseover="showOptions = true"
      @dblclick.stop=""
    >
      <v-icon name="md-morevert-round" />
    </button>
    <div 
      v-if="showOptions" 
      :class="`button-list bordered ${spacing !== 'close' ? 'absolute -translate-x-[110%]' : 'max-sm:absolute max-sm:-translate-x-[110%]'}`"
    >
      <button v-if="addSectionButton" class="add-section-btn" @click="$emit('onAddSection')" @dblclick.stop="">
        <v-icon name="md-add-round" />
      </button>
      <button v-if="addItemButton" class="add-item-btn" @click="$emit('onAddItem')" @dblclick.stop="">
        <v-icon name="md-add-round" />
      </button>
      <button v-if="addDisableButton" class="disable-btn" @click="$emit('onDisable')" @dblclick.stop="">
        <v-icon name="gi-sight-disabled" />
      </button>
      <button class="delete-btn" @click="$emit('onDelete')" @dblclick.stop="">
        <v-icon name="hi-solid-x" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
    const { options, spacing = "close" } = defineProps<{
        options?: {
          addSectionButton?: boolean,
          addItemButton?: boolean,
          addDisableButton?: boolean,
        },
        spacing?: "close" | "far" | "further"
    }>();
    const { addSectionButton = false, addItemButton = false, addDisableButton = false } = options ?? {};
    const emit = defineEmits(["onAddItem", "onAddSection", "onDelete", "onDisable"]);

    const reactiveMenu = useState<reactiveMenuState>("reactiveMenuState").value;

    const showOptions = ref(false);
  </script>

<style scoped>
  .edit-buttons {
    position: absolute;
    display: flex;
    align-items: start;
    gap: 0.25rem;
    padding: 0 1rem;
    top: 0%;
    font-family: "Source Sans Pro", sans-serif;
    font-size: 10pt;
    font-weight: 600;
    color: initial;
    user-select: none;
    z-index: 10;

    .button-list {
      display: flex;
      flex-direction: column;
      width: 2.5rem;

      button:focus-visible {
        outline: 2px solid var(--color-selection);
        border-radius: 10px;
      }

      button:hover::after {
        position: absolute;
        padding: 1rem;
        border-radius: 10px;
        background-color: black;
        color: white;
        text-wrap: nowrap;
        font-size: 8pt;
        top: 50%;
        transform: translate(1.1rem, -50%);
      }

      .add-section-btn {
        position: relative;
        color: #F75707;

        &:hover::after {
          content: 'Add Subcategory';
        }
      }

      .add-item-btn {
        position: relative;
        color: green;

        &:hover::after {
          content: 'Add Menu Item';
        }
      }

      .delete-btn {
        position: relative;
        color: red;

        &:hover::after {
          content: 'Delete';
        }
      }

      .disable-btn {
        position: relative;
        color: black;

        &:hover::after {
          content: 'Disable Item';
        }
      }
    }

    > button:focus-visible {
      outline: none;
      color: var(--color-selection);
    }
  }

  .bordered {
    padding: 0.5rem;
    border-radius: 10px;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.5), 0 8px 10px -6px rgb(0 0 0 / 0.5);
    background-color: var(--color-primary);
    color: var(--color-menu-text);
  }
</style>