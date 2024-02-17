export const STEPS = ["Metadata", "Data", "Table", "Excute"];

export const ROLES = [
    {
        name: "著者",
        role: "aut",
    },
    {
        name: "翻訳者",
        role: "trl",
    },
    {
        name: "編集者",
        role: "edt",
    },
    {
        name: "絵・イラスト",
        role: "ill",
    },
];

export const STYLE_CSS = `@charset "UTF-8";
        
body {
    margin: 0;
    padding: 0;
    background-color: #fff;
    color: #000;
    font-size: 100%;
    font-family: sans-serif;
}
div.main {
    margin: 0;
    padding: 0;
    text-align: center;
}
img {
    max-width: 100%;
    height: auto;
}`;
