const fs = require("fs");
const path = require("path");

export async function create_epub(epub) {
    await create_folder(epub);
    if (epub.working_folder == undefined) {
        return;
    }
    create_mimetype(epub);
    create_conteiner_xml(epub);
    create_standard_opf(epub);
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
    const builder = require("xmlbuilder");
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

function create_standard_opf(epub) {
    // const file_name = "standard.opf";
    // make xml text
    const builder = require("xmlbuilder");
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
    // let manifest = xml.ele("manifest");
    // let spine = xml.ele("spine");

    const path = epub.working_folder + "/item/standard.opf";
    fs.writeFileSync(path, xml.end({ pretty: true }));
}
