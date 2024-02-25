import { STYLE_CSS } from "./statics.js";
const fs = require("fs");
const path = require("path");
const builder = require("xmlbuilder");
const JSZip = require("jszip");
import i18n from "@/i18n";

export async function create_epub(epub) {
    await create_folder(epub);
    if (epub.working_folder == undefined) {
        return;
    }
    epub.file_name = epub.title.title.replace("?", "_") + ".epub";
    console.log("create_epub: " + epub.file_name);
    // create_mimetype(epub);
    await create_conteiner_xml(epub);
    await image_copy(epub);
    await create_style_css(epub);
    await create_navigation_documents(epub);
    await create_toc_ncx(epub);
    await create_standard_opf(epub);
    // compile
    await create_epub_file(epub);
}

function append_file(archive, working_folder, folder_path) {
    const files = fs.readdirSync(working_folder + "/" + folder_path);
    for (let file of files) {
        const file_path = working_folder + "/" + folder_path + "/" + file;
        if (fs.lstatSync(file_path).isDirectory()) {
            console.log("folder: " + folder_path + "/" + file);
            append_file(archive, working_folder, folder_path + "/" + file);
        } else {
            archive.file(folder_path + "/" + file, fs.readFileSync(file_path));
            console.log("append: " + folder_path + "/" + file);
        }
    }
}

async function create_epub_file(epub) {
    const folder_path = epub.create_folder;
    const working_folder = folder_path + "/output";
    const file_path = folder_path + "/" + epub.file_name;
    const archive = new JSZip();
    archive.file("mimetype", "application/epub+zip", { compression: "STORE" });
    archive.folder("META-INF");
    archive.folder("item");
    append_file(archive, working_folder, "META-INF");
    append_file(archive, working_folder, "item");
    const content = await archive.generateAsync({ type: "nodebuffer" });
    console.log("create_epub_file: " + file_path);
    await fs.promises.writeFile(file_path, content);
}

/**
 * delete folder recursively
 * @param {string} directory
 */
function deleteFolderRecursive(directory) {
    if (fs.existsSync(directory)) {
        fs.readdirSync(directory).forEach((file) => {
            const curPath = path.join(directory, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                // recurse
                deleteFolderRecursive(curPath);
            } else {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(directory);
    }
}

async function create_folder(epub) {
    const folder_path = epub.create_folder;
    const working_folder = folder_path + "/output";
    epub.working_folder = working_folder;
    // make output
    if (!fs.existsSync(working_folder)) {
        // make output folder recursively
        fs.mkdirSync(working_folder, { recursive: true });
    } else {
        // delete output folder recursively
        deleteFolderRecursive(working_folder);
        // make output folder recursively
        fs.mkdirSync(working_folder, { recursive: true });
    }
    // make META-INF folder
    if (!fs.existsSync(working_folder + "/META-INF")) {
        fs.mkdirSync(working_folder + "/META-INF");
    }
    // make item folder
    if (!fs.existsSync(working_folder + "/item")) {
        fs.mkdirSync(working_folder + "/item");
    }
    fs.mkdirSync(working_folder + "/item/image");
    fs.mkdirSync(working_folder + "/item/css");
    fs.mkdirSync(working_folder + "/item/xhtml");
}

/**
 * create mimetype
 * @param {Epub} epub
 */
/*
function create_mimetype(epub) {
    const file_name = "mimetype";
    let mimetype_text = "application/epub+zip";
    const file_path = epub.working_folder + "/" + file_name;
    fs.writeFileSync(file_path, mimetype_text);
}
*/

/**
 * create conteiner.xml
 * @param {Epub} epub
 */
async function create_conteiner_xml(epub) {
    const file_name = "container.xml";
    // make xml text
    let xml = builder.create("container");
    xml.att("version", "1.0");
    xml.att("xmlns", "urn:oasis:names:tc:opendocument:xmlns:container");
    let rootfiles = xml.ele("rootfiles");
    let rootfile = rootfiles.ele("rootfile");
    rootfile.att("full-path", "item/standard.opf");
    rootfile.att("media-type", "application/oebps-package+xml");
    // write file
    const file_path = epub.working_folder + "/META-INF/" + file_name;
    await fs.promises.writeFile(file_path, xml.end({ pretty: true }));
}

async function image_copy(epub) {
    const folder_path = epub.working_folder + "/item/image";
    // make output
    if (!fs.existsSync(folder_path)) {
        // make output folder recursively
        fs.mkdirSync(folder_path, { recursive: true });
    }
    const totalDigits = String(epub.files.length).length;
    for (let i = 0; i < epub.files.length; i++) {
        const efile = epub.files[i];
        let file = epub.files[i].file;
        if (file.type.indexOf("image") != -1) {
            let file_name = file.name;
            if (efile.cover != undefined && efile.cover == true) {
                file_name = "i-cover." + file.name.split(".").pop();
            } else {
                // file name is image001.jpg,...image100.jpg
                file_name =
                    "i-" +
                    (i + 1).toString().padStart(totalDigits, "0") +
                    "." +
                    file.name.split(".").pop();
            }
            fs.copyFileSync(file.path, folder_path + "/" + file_name);
            efile.image_path = "image/" + file_name;
            // make xhtml
            await make_xhtml_from_image(epub, efile, file_name);
        } else {
            console.log("not image");
            fs.copyFileSync(file.path, folder_path + "/" + file.name);
        }
    }
}

async function make_xhtml_from_image(epub, file, file_name) {
    const folder_path = epub.working_folder + "/item/xhtml";
    // make output
    if (!fs.existsSync(folder_path)) {
        // make output folder recursively
        fs.mkdirSync(folder_path, { recursive: true });
    }
    // make xhtml
    const xhtml = builder.create("html", {
        encoding: "UTF-8",
        doctype: "html",
    });
    xhtml.att("xmlns", "http://www.w3.org/1999/xhtml");
    xhtml.att("lang", "ja");
    xhtml.att("xmlns:epub", "http://www.idpf.org/2007/ops");
    let head = xhtml.ele("head");
    let meta = head.ele("meta");
    meta.att("charset", "UTF-8");
    let title = head.ele("title");
    title.txt(epub.title.title);
    let style = head.ele("link");
    style.att("type", "text/css");
    style.att("href", "../css/style.css");
    style.att("rel", "stylesheet");

    let body = xhtml.ele("body");
    let div = body.ele("div");
    div.att("class", "main");
    let img = div.ele("img");
    img.att("src", `../image/${file_name}`);
    img.att("alt", file_name);

    // write file
    // image file name is i-001.jpg, xhtml file name is p-001.xhtml
    const xhtml_file_name =
        "p-" + file_name.split("-")[1].split(".")[0] + ".xhtml";
    const xhtml_path = folder_path + "/" + xhtml_file_name;
    file.href = "xhtml/" + xhtml_file_name;

    let size = head.ele("meta");
    size.att("name", "viewport");
    if (file.width != undefined && file.height != undefined) {
        console.log("width: " + file.width + ", height: " + file.height);
        size.att("content", `width=${file.width}, height=${file.height}`);
        await fs.promises.writeFile(xhtml_path, xhtml.end({ pretty: true }));
    } else {
        const img_render = new Image();
        img_render.src = URL.createObjectURL(file.file);
        img_render.onload = function () {
            const width = this.width;
            const height = this.height;
            size.att("content", `width=${width}, height=${height}`);
            fs.writeFileSync(xhtml_path, xhtml.end({ pretty: true }));
        };
        img_render.onerror = function () {
            fs.writeFileSync(xhtml_path, xhtml.end({ pretty: true }));
        };
    }
}

/**
 * create style.css
 * @param {Epub} epub
 */
async function create_style_css(epub) {
    const file_name = "style.css";
    // make xml text
    let css = STYLE_CSS;
    // write file
    const file_path = epub.working_folder + "/item/css/" + file_name;
    await fs.promises.writeFile(file_path, css);
}

async function create_navigation_documents(epub) {
    const file_name = "navigation-documents.xhtml";
    // make xml text
    let xml = builder.create("html", {
        encoding: "UTF-8",
        doctype: "html",
    });
    xml.att("xmlns", "http://www.w3.org/1999/xhtml");
    xml.att("xmlns:epub", "http://www.idpf.org/2007/ops");
    xml.att("lang", epub.metadata.language);
    let head = xml.ele("head");
    let meta = head.ele("meta");
    meta.att("charset", "UTF-8");
    let title = head.ele("title");
    title.txt("Navigation");
    let style = head.ele("link");
    style.att("type", "text/css");
    style.att("href", "css/style.css");
    style.att("rel", "stylesheet");
    let body = xml.ele("body");
    let nav = body.ele("nav");
    nav.att("epub:type", "toc");
    nav.att("id", "toc");
    let h1 = nav.ele("h1");
    h1.txt(i18n.global.t("TocTitle"));
    let ol = nav.ele("ol");
    if (epub.tables.length != 0) {
        epub.tables.forEach((item) => {
            ol = item.xml(ol);
        });
    } else {
        // make only p-cover.xhtml
        let li = ol.ele("li");
        let a = li.ele("a");
        a.att("href", "xhtml/p-cover.xhtml");
        a.txt("Cover");
    }
    let nav2 = body.ele("nav");
    nav2.att("epub:type", "landmarks");
    let h2 = nav2.ele("h2");
    h2.txt("Landmarks");
    if (epub.landmarks != undefined) {
        for (let item of epub.landmarks) {
            let ol = nav2.ele("ol");
            let li = ol.ele("li");
            let a = li.ele("a");
            a.att("href", item.href);
            a.txt(item.title);
        }
    } else {
        // make only p-cover.xhtml
        let ol = nav2.ele("ol");
        let li = ol.ele("li");
        let a = li.ele("a");
        a.att("epub:type", "cover");
        a.att("href", "xhtml/p-cover.xhtml");
        a.txt("Cover");
    }
    // write file
    const file_path = epub.working_folder + "/item/" + file_name;
    await fs.promises.writeFile(file_path, xml.end({ pretty: true }));
}

async function create_toc_ncx(epub) {
    const file_name = "toc.ncx";
    // make xml text
    let xml = builder.create("ncx");
    xml.att("xmlns", "http://www.daisy.org/z3986/2005/ncx/");
    xml.att("version", "2005-1");
    let head = xml.ele("head");
    let meta = head.ele("meta");
    meta.att("name", "dtb:uid");
    meta.att("content", epub.metadata.id);
    let meta2 = head.ele("meta");
    meta2.att("name", "dtb:depth");
    meta2.att("content", "1");
    let meta3 = head.ele("meta");
    meta3.att("name", "dtb:totalPageCount");
    meta3.att("content", "0");
    let meta4 = head.ele("meta");
    meta4.att("name", "dtb:maxPageNumber");
    meta4.att("content", "0");
    let docTitle = xml.ele("docTitle");
    let text = docTitle.ele("text");
    text.txt(epub.title.title);
    let navMap = xml.ele("navMap");
    if (epub.tables.length != 0) {
        epub.tables.forEach((item, index) => {
            navMap = item.ncx(navMap, index + 1);
        });
    } else {
        // make only p-cover.xhtml
        let navPoint = navMap.ele("navPoint");
        navPoint.att("id", "xhtml-p-cover");
        navPoint.att("playOrder", "1");
        let navLabel = navPoint.ele("navLabel");
        let text = navLabel.ele("text");
        text.txt("Cover");
        let content = navPoint.ele("content");
        content.att("src", "xhtml/p-cover.xhtml");
    }
    // write file
    const file_path = epub.working_folder + "/item/" + file_name;
    await fs.promises.writeFile(file_path, xml.end({ pretty: true }));
}

/**
 * create standard.opf
 * @param {Epub} epub
 */
async function create_standard_opf(epub) {
    // const file_name = "standard.opf";
    // make xml text
    let xml = builder.create("package");
    xml.att("xmlns", "http://www.idpf.org/2007/opf");
    xml.att("unique-identifier", "unique-id");
    xml.att("version", "3.0");
    let metadata = xml.ele("metadata");
    metadata.att("xmlns:dc", "http://purl.org/dc/elements/1.1/");
    metadata = epub.title.xml(metadata);
    for (let creator of epub.creators) {
        metadata = creator.xml(metadata);
    }
    for (let publisher of epub.publishers) {
        metadata = publisher.xml(metadata);
    }
    metadata = epub.description.xml(metadata);
    metadata = epub.metadata.xml(metadata);
    let manifest = xml.ele("manifest");
    // add css and toc
    let css_item = manifest.ele("item");
    css_item.att("id", "css_style");
    css_item.att("href", "css/style.css");
    css_item.att("media-type", "text/css");
    let navigation_item = manifest.ele("item");
    navigation_item.att("id", "toc");
    navigation_item.att("href", "navigation-documents.xhtml");
    navigation_item.att("media-type", "application/xhtml+xml");
    navigation_item.att("properties", "nav");
    let ncx_item = manifest.ele("item");
    ncx_item.att("id", "ncx");
    ncx_item.att("href", "toc.ncx");
    ncx_item.att("media-type", "application/x-dtbncx+xml");

    for (let file of epub.files) {
        let item = manifest.ele("item");
        // file path is image/i-001.jpg, id is i-001
        const image_file_path =
            file.image_path != undefined ? file.image_path : file.path;
        const image_id = image_file_path.split("/").pop().split(".")[0];
        item.att("id", image_id);
        item.att("href", image_file_path);
        item.att("media-type", file.file.type);
        if (file.cover != undefined && file.cover == true) {
            item.att("properties", "cover-image");
        }
        // xhtml
        if (file.href != undefined) {
            let item = manifest.ele("item");
            const xhtml_file_path = file.href;
            const xhtml_id = xhtml_file_path.split("/").pop().split(".")[0];
            item.att("id", xhtml_id);
            item.att("href", xhtml_file_path);
            item.att("media-type", "application/xhtml+xml");
            item.att("fallback", image_id);
        }
    }
    let spine = xml.ele("spine");
    spine.att("toc", "ncx");
    console.log(epub.metadata.page_progression_direction);
    spine.att(
        "page-progression-direction",
        epub.metadata.page_progression_direction
    );
    for (let file of epub.files) {
        if (file.href != undefined) {
            let itemref = spine.ele("itemref");
            const xhtml_file_path = file.href;
            const xhtml_id = xhtml_file_path.split("/").pop().split(".")[0];
            itemref.att("idref", xhtml_id);
            itemref.att("linear", "yes");
            switch (file.page_style) {
                case "left":
                    itemref.att("properties", "page-spread-left");
                    break;
                case "right":
                    itemref.att("properties", "page-spread-right");
                    break;
                case "center":
                    itemref.att("properties", "rendition:page-spread-center");
                    break;
                default:
                    break;
            }
        }
    }

    const file_path = epub.working_folder + "/item/standard.opf";
    await fs.promises.writeFile(file_path, xml.end({ pretty: true }));
}
