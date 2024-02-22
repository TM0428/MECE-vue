import i18n from "@/i18n";

export const STEPS = [
    i18n.global.t("steps.step1"),
    i18n.global.t("steps.step2"),
    i18n.global.t("steps.step3"),
    i18n.global.t("steps.step4"),
];

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

export const TYPES = [
    {
        type: "novel",
        name: i18n.global.t("epubMetadata.anotherMetadata.types.novel"),
    },
    {
        type: "comic",
        name: i18n.global.t("epubMetadata.anotherMetadata.types.comic"),
    },
    {
        type: "photo",
        name: i18n.global.t("epubMetadata.anotherMetadata.types.photo"),
    },
    {
        type: "magazine",
        name: i18n.global.t("epubMetadata.anotherMetadata.types.magazine"),
    },
    {
        type: "artbook",
        name: i18n.global.t("epubMetadata.anotherMetadata.types.artbook"),
    },
    {
        type: "textbook",
        name: i18n.global.t("epubMetadata.anotherMetadata.types.textbook"),
    },
    {
        type: "other",
        name: i18n.global.t("epubMetadata.anotherMetadata.types.other"),
    },
];

export const PAGE_PROGRESSION = [
    {
        page: "rtl",
        name: i18n.global.t("epubMetadata.anotherMetadata.pageProgression.rtl"),
    },
    {
        page: "ltr",
        name: i18n.global.t("epubMetadata.anotherMetadata.pageProgression.ltr"),
    },
];

export const PAGE_STYLE = [
    {
        value: "right-left",
        text: i18n.global.t("displayStyles.options.right-left"),
    },
    {
        value: "left-right",
        text: i18n.global.t("displayStyles.options.left-right"),
    },
    {
        value: "center",
        text: i18n.global.t("displayStyles.options.center"),
    },
    {
        value: "center-right-left",
        text: i18n.global.t("displayStyles.options.center-right-left"),
    },
    {
        value: "center-left-right",
        text: i18n.global.t("displayStyles.options.center-left-right"),
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
    -webkit-writing-mode: horizontal-rl;
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
