import i18n from "@/i18n";

export const STEPS = ["Metadata", "Data", "Table", "Excute"];

export const ROLES = [
    {
        name: i18n.global.t("epubMetadata.creator.roleOptions.aut"),
        role: "aut",
    },
    {
        name: i18n.global.t("epubMetadata.creator.roleOptions.trl"),
        role: "trl",
    },
    {
        name: i18n.global.t("epubMetadata.creator.roleOptions.edt"),
        role: "edt",
    },
    {
        name: i18n.global.t("epubMetadata.creator.roleOptions.ill"),
        role: "ill",
    },
    {
        name: i18n.global.t("epubMetadata.creator.roleOptions.oth"),
        role: "oth",
    },
];

export const LANGUAGES = [
    {
        lang: "ja",
        name: i18n.global.t("epubMetadata.anotherMetadata.languages.ja"),
    },
    {
        lang: "en",
        name: i18n.global.t("epubMetadata.anotherMetadata.languages.en"),
    },
    {
        lang: "de",
        name: i18n.global.t("epubMetadata.anotherMetadata.languages.de"),
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
