import { STYLE_CSS } from "./statics.js";
const fs = require("fs");
const path = require("path");
const builder = require("xmlbuilder");

export async function create_epub(epub) {
    await create_folder(epub);
    if (epub.working_folder == undefined) {
        return;
    }
    create_mimetype(epub);
    create_conteiner_xml(epub);
    await image_copy(epub);
    create_style_css(epub);
    create_standard_opf(epub);
    // debug
    for (let file of epub.files) {
        console.log(file);
    }
}

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
    const path = epub.create_folder;
    const working_folder = path + "/output";
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
    fs.mkdirSync(working_folder + "/item/style");
    fs.mkdirSync(working_folder + "/item/xhtml");
}

function create_mimetype(epub) {
    const file_name = "mimetype";
    let mimetype_text = "application/epub+zip";
    const path = epub.working_folder + "/" + file_name;
    fs.writeFileSync(path, mimetype_text);
}

function create_conteiner_xml(epub) {
    const file_name = "conteiner.xml";
    // make xml text
    let xml = builder.create("container");
    xml.att("version", "1.0");
    xml.att("xmlns", "urn:oasis:names:tc:opendocument:xmlns:container");
    let rootfiles = xml.ele("rootfiles");
    let rootfile = rootfiles.ele("rootfile");
    rootfile.att("full-path", "item/standard.opf");
    rootfile.att("media-type", "application/oebps-package+xml");
    // write file
    const path = epub.working_folder + "/META-INF/" + file_name;
    fs.writeFileSync(path, xml.end({ pretty: true }));
}

async function image_copy(epub) {
    const path = epub.working_folder + "/item/image";
    // make output
    if (!fs.existsSync(path)) {
        // make output folder recursively
        fs.mkdirSync(path, { recursive: true });
    }
    const totalDigits = String(epub.files.length).length;
    for (let i = 0; i < epub.files.length; i++) {
        let file = epub.files[i];
        if (file.type.indexOf("image") != -1) {
            let file_name = file.name;
            if (file.cover != undefined && file.cover == true) {
                file_name = "i-cover." + file.name.split(".").pop();
            } else {
                // file name is image001.jpg,...image100.jpg
                file_name =
                    "i-" +
                    (i + 1).toString().padStart(totalDigits, "0") +
                    "." +
                    file.name.split(".").pop();
            }
            fs.copyFileSync(file.path, path + "/" + file_name);
            file.image_path = "image/" + file_name;
            // make xhtml
            await make_xhtml_from_image(epub, file, file_name);
        } else {
            console.log("not image");
            fs.copyFileSync(file.path, path + "/" + file.name);
        }
    }
}

async function make_xhtml_from_image(epub, file, file_name) {
    const path = epub.working_folder + "/item/xhtml";
    // make output
    if (!fs.existsSync(path)) {
        // make output folder recursively
        fs.mkdirSync(path, { recursive: true });
    }
    // make xhtml
    const xhtml = builder.create("html");
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
    let size = head.ele("meta");
    size.att("name", "viewport");
    size.att("content", `width=${file.width}, height=${file.height}`);
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
    const xhtml_path = path + "/" + xhtml_file_name;
    file.xhtml_path = "xhtml/" + xhtml_file_name;
    fs.writeFileSync(xhtml_path, xhtml.end({ pretty: true }));
}

function create_style_css(epub) {
    const file_name = "style.css";
    // make xml text
    let css = STYLE_CSS;
    // write file
    const path = epub.working_folder + "/item/style/" + file_name;
    fs.writeFileSync(path, css);
}

function create_standard_opf(epub) {
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
    for (let file of epub.files) {
        let item = manifest.ele("item");
        // file path is image/i-001.jpg, id is i-001
        const image_file_path =
            file.image_path != undefined ? file.image_path : file.path;
        const image_id = image_file_path.split("/").pop().split(".")[0];
        item.att("id", image_id);
        item.att("href", image_file_path);
        item.att("media-type", file.type);
        if (file.cover != undefined && file.cover == true) {
            item.att("properties", "cover-image");
        }
        // xhtml
        if (file.xhtml_path != undefined) {
            let item = manifest.ele("item");
            const xhtml_file_path = file.xhtml_path;
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
        if (file.xhtml_path != undefined) {
            let itemref = spine.ele("itemref");
            const xhtml_file_path = file.xhtml_path;
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
                    itemref.att("properties", "page-spread-center");
                    break;
                default:
                    break;
            }
        }
    }

    const path = epub.working_folder + "/item/standard.opf";
    fs.writeFileSync(path, xml.end({ pretty: true }));
}
