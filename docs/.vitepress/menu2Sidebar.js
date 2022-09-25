const commonPath = "/menu2";

export default [
  {
    text: "文字",
    collapsible: true,
    collapsed: false,
    items: [
      // This shows `/guide/index.md` page.
      { text: "骏马面前无沟壑，怂人面前全是坎", link: `${commonPath}/a.md` }, // /guide/index.md
    ],
  },
];
