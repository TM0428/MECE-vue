export class Creator {
    constructor(
        name = "",
        name_yomi = "",
        role = "aut",
        seq = 1,
        id = "creator01",
        index = 0
    ) {
        this.name = name;
        this.name_yomi = name_yomi;
        this.role = role;
        this.seq = seq;
        this.id = id;
        this.index = index;
    }
    /**
     * @param {xmlbuilder} metadata_xml
     * @return {xmlbuilder} metadata_xml
     * @description add creator to metadata_xml
     */
    xml(metadata_xml) {
        metadata_xml.com("著者名");
        let creator = metadata_xml.ele("dc:creator", this.name);
        creator.att("id", this.id);
        let role = metadata_xml.ele("meta", this.role);
        role.att("refines", "#" + this.id);
        role.att("property", "role");
        role.att("scheme", "marc:relators");

        let seq = metadata_xml.ele("meta", this.seq.toString());
        seq.att("refines", "#" + this.id);
        seq.att("property", "display-seq");

        if (this.name_yomi.length > 0) {
            let meta = metadata_xml.ele("meta", this.name_yomi);
            meta.att("refines", "#" + this.id);
            meta.att("property", "file-as");
        }
        return metadata_xml;
    }
}

export class Title {
    constructor(title = "", title_yomi = "", id = "title") {
        this.title = title;
        this.title_yomi = title_yomi;
        this.id = id;
    }
    /**
     * @param {xmlbuilder} metadata_xml
     * @return {xmlbuilder} metadata_xml
     * @description add title to metadata_xml
     */
    xml(metadata_xml) {
        metadata_xml.com("作品名");
        let title = metadata_xml.ele("dc:title", this.title);
        title.att("id", this.id);
        if (this.title_yomi.length > 0) {
            let meta = metadata_xml.ele("meta", this.title_yomi);
            meta.att("refines", "#" + this.id);
            meta.att("property", "file-as");
        }
        return metadata_xml;
    }
}

export class Publisher {
    constructor(name = "", name_yomi = "", id = "publisher") {
        this.name = name;
        this.name_yomi = name_yomi;
        this.id = id;
    }
    /**
     * @param {xmlbuilder} metadata_xml
     * @return {xmlbuilder} metadata_xml
     * @description add publisher to metadata_xml
     */
    xml(metadata_xml) {
        metadata_xml.com("出版社名");
        let publisher = metadata_xml.ele("dc:publisher", this.name);
        publisher.att("id", this.id);
        if (this.name_yomi.length > 0) {
            let meta = metadata_xml.ele("meta", this.name_yomi);
            meta.att("refines", "#" + this.id);
            meta.att("property", "file-as");
        }
        return metadata_xml;
    }
}

export class Description {
    constructor(description = "") {
        this.description = description;
    }
    /**
     * @param {xmlbuilder} metadata_xml
     * @return {xmlbuilder} metadata_xml
     * @description add description to metadata_xml
     */
    xml(metadata_xml) {
        if (this.description.length > 0) {
            metadata_xml.com("作品説明");
            metadata_xml.ele("dc:description", this.description);
        }
        return metadata_xml;
    }
}

export class Metadata {
    constructor(
        language = "ja",
        id,
        type = "comic",
        modified = "2000-01-01T00:00",
        page_progression_direction = "rtl"
    ) {
        this.language = language;
        if (id == undefined) {
            this.create_id();
        } else {
            this.id = id;
        }
        this.type = type;
        this.modified = new Date(modified);
        this.page_progression_direction = page_progression_direction;
    }
    create_id() {
        // urn:uuid:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        let uuid = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (c) {
                let r = (Math.random() * 16) | 0,
                    v = c == "x" ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            }
        );
        this.id = "urn:uuid:" + uuid;
    }

    getDate() {
        const year = this.modified.getFullYear();
        const month = (this.modified.getMonth() + 1)
            .toString()
            .padStart(2, "0");
        const day = this.modified.getDate().toString().padStart(2, "0");
        return year + "-" + month + "-" + day;
    }
    getIsoDate() {
        const year = this.modified.getFullYear();
        const month = (this.modified.getMonth() + 1)
            .toString()
            .padStart(2, "0");
        const day = this.modified.getDate().toString().padStart(2, "0");
        return year + "-" + month + "-" + day + "T00:00:00Z";
    }

    /**
     * @param {xmlbuilder} metadata_xml
     * @return {xmlbuilder} metadata_xml
     * @description add metadata to metadata_xml
     */
    xml(metadata_xml) {
        metadata_xml.com("メタデータ");
        let identifier = metadata_xml.ele("dc:identifier", this.id);
        identifier.att("id", "unique-id");
        metadata_xml.ele("dc:type", this.type);
        metadata_xml.ele("dc:language", this.language);
        // meta
        const modified_str = this.getIsoDate();
        let modified = metadata_xml.ele("meta", modified_str);
        modified.att("property", "dcterms:modified");
        let booktype = metadata_xml.ele("meta");
        booktype.att("content", this.type);
        booktype.att("name", "book-type");
        let fixed_layout = metadata_xml.ele("meta");
        fixed_layout.att("name", "fixed-layout");
        fixed_layout.att("content", "true");
        let orientation = metadata_xml.ele("meta");
        orientation.att("name", "orientation-lock");
        orientation.att("content", "none");
        let page_prog_dir = metadata_xml.ele("meta");
        page_prog_dir.att("name", "primary-writing-mode");
        page_prog_dir.att("content", "horizontal-rl");
        let rendition_layout = metadata_xml.ele("meta", "pre-paginated");
        rendition_layout.att("property", "rendition:layout");

        return metadata_xml;
    }
}

export class TocContent {
    constructor(title = "title", file, id = "xhtml-p-cover") {
        this.title = title;
        this.file = file;
        this.children = [];
        this.id = id;
    }
    /**
     * @param {xmlbuilder} nav_xml
     * @return {xmlbuilder} nav_xml
     * @description add table of content to toc_ncx
     */
    ncx(nav_xml, playOrder = 1) {
        let nav_point = nav_xml.ele("navPoint");
        nav_point.att("id", this.id);
        nav_point.att("playOrder", playOrder);
        nav_point.ele("navLabel").ele("text", this.title);
        nav_point.ele("content").att("src", this.file.href);
        for (let child of this.children) {
            child.xml(nav_point);
        }
        return nav_xml;
    }

    /**
     * @param {xmlbuilder} nav_xml
     * @return {xmlbuilder} nav_xml
     * @description add table of content to nav_xml
     */
    xml(nav_xml) {
        let nav_point = nav_xml.ele("li");
        let a = nav_point.ele("a", this.title);
        a.att("href", this.file.href);
        if (this.children.length > 0) {
            let ol = nav_point.ele("ol");
            for (let child of this.children) {
                child.xml(ol);
            }
        }
        return nav_xml;
    }
}

export class ExtendedFile extends File {
    constructor(file, id = "id", media_type = "", page_style = "") {
        super(file);
        this.id = id;
        this.media_type = media_type;
        this.page_style = page_style;
    }
}

export class Epub {
    constructor() {
        this.title = new Title("", "", "title");
        this.creators = [new Creator("", "", "aut", 1, "creator01")];
        this.publishers = [new Publisher("", "", "publisher")];
        this.description = new Description();
        this.metadata = new Metadata();
        this.files = [];
        this.tables = [];
        this.create_folder = "./sample";
        this.file_name = "sample.epub";
    }
    create_publisher() {
        if (this.publisher.length == 0) {
            this.publisher = [new Publisher("", "", "publisher")];
        } else {
            this.publisher.push(
                new Publisher(
                    "",
                    "",
                    "publisher" + this.title.length.toString()
                )
            );
        }
    }
    create_creator() {
        if (this.creators.length == 0) {
            this.creators = [new Creator("", "", "aut", 1, "creator01")];
        } else {
            // id is creator01, creator02, ...
            let id =
                "creator" +
                (this.creators.length + 1).toString().padStart(2, "0");
            this.creators.push(
                new Creator("", "", "aut", this.creators.length + 1, id)
            );
        }
    }
}

export function sample_epub() {
    let epub = new Epub();
    epub.title = new Title("title_desu", "title_yomi", "title");
    epub.creators = [
        new Creator("name_desu", "name_yomi", "aut", 1, "creator01"),
    ];
    epub.publishers = [new Publisher("publisher_desu", "publisher_yomi")];
    epub.description = new Description("description_desu");

    return epub;
}

export async function create_epub_from_isbn(isbn) {
    const url = `https://api.openbd.jp/v1/get?isbn=${isbn}`;
    const response = await fetch(url);
    const data = await response.json();
    const book = data[0];
    console.log(book);
    const epub = new Epub();
    epub.title = new Title(
        data[0].onix.DescriptiveDetail.TitleDetail.TitleElement.TitleText
            .content || "",
        data[0].onix.DescriptiveDetail.TitleDetail.TitleElement.TitleText
            .collationkey || ""
    );
    epub.creators = [];
    for (
        let i = 0;
        i < data[0].onix.DescriptiveDetail.Contributor.length;
        i++
    ) {
        let id = "creator" + (i + 1).toString().padStart(2, "0");
        epub.creators.push(
            new Creator(
                data[0].onix.DescriptiveDetail.Contributor[i].PersonName
                    .content || "",
                data[0].onix.DescriptiveDetail.Contributor[i].PersonName
                    .collationkey || "",
                "aut",
                Number(
                    data[0].onix.DescriptiveDetail.Contributor[i]
                        .SequenceNumber || i + 1
                ),
                id,
                i
            )
        );
    }
    epub.publishers = [];
    if (data[0].onix.PublishingDetail.Publisher.PublisherName != undefined) {
        epub.publishers.push(
            new Publisher(
                data[0].onix.PublishingDetail.Publisher.PublisherName || "",
                ""
            )
        );
    }

    let description = "";
    for (let i = 0; i < data[0].onix.CollateralDetail.TextContent.length; i++) {
        if (
            data[0].onix.CollateralDetail.TextContent[i].ContentAudience ===
            "00" /* Description */
        ) {
            description += data[0].onix.CollateralDetail.TextContent[i].Text;
        }
    }

    epub.description = new Description(description);

    if (book.hanmoto) {
        epub.metadata.modified = new Date(book.hanmoto.datemodified);
    }

    return epub;
}
