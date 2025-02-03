import { Extension } from "@tiptap/react";
import "@tiptap/extension-text-style";

export interface FontSizeOptions {
  types: string[];
  sizes: string[];
  defaultSize: string | null;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

export const FontSize = Extension.create<FontSizeOptions>({
  name: "fontSize",

  addOptions() {
    return {
      types: ["textStyle"],
      sizes: [
        "12px",
        "16px",
        "20px",
        "24px",
        "28px",
        "32px",
        "36px",
        "40px",
        "44px",
        "48px",
        "52px",
        "56px",
        "60px",
      ],
      defaultSize: null,
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: this.options.defaultSize,
            parseHTML: (element) => {
              const fontSize = element.style.fontSize;
              return this.options.sizes.includes(fontSize)
                ? fontSize
                : this.options.defaultSize;
            },
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }

              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (size: string) =>
        ({ commands }) => {
          if (!this.options.sizes.includes(size)) {
            return false;
          }

          console.log(size);

          return this.options.types
            .map((type) => commands.setMark(type, { fontSize: size }))
            .every((response) => response);
        },

      unsetTextAlign:
        () =>
        ({ commands }) => {
          return this.options.types
            .map((type) => commands.setMark(type, { fontSize: null }))
            .every((response) => response);
        },
    };
  },
});
