export class Creator {
    constructor(name, name_yomi, role="aut", seq, id){
        this.name = name;
        this.name_yomi = name_yomi;
        this.role = role;
        this.seq = seq;
        this.id = id;
    }
}

export class Title{
    constructor(title, title_yomi, id="title"){
        this.title = title;
        this.title_yomi = title_yomi;
        this.id = id;
    }
}

export class Publisher{
    constructor(name, name_yomi){
        this.name = name;
        this.name_yomi = name_yomi;
    }
}

export class Description{
    constructor(description){
        this.description = description;
    }
}

export class Metadata{
    constructor(language="ja", id, type="comic", modified="2000-01-01T00:00:00Z"){
        this.language = language;
        this.id = id;
        this.type = type;
        this.modified = modified;
    }
    create_id(){
        return "urn:uuid:" + crypto.randomUUID();
    }
}

export class Epub{
    constructor(){
        this.metadata = undefined;
        // creators is array of Creator
        this.creators = [];
        // title is array of Title
        this.title = [];
        this.publisher = undefined;
        this.description = undefined;
    }
    create(){
        return {
            "metadata": {
                "@language": this.metadata.language,
                "@id": this.metadata.id,
                "@type": this.metadata.type,
                "modified": this.metadata.modified,
                "creator": this.creators,
                "title": this.title,
                "publisher": this.publisher,
                "description": this.description
            }
        }
    }
    create_title(){
        if(this.title.length == 0){
            this.title = [new Title("", "")];
        }
        else{
            this.title.push(new Title("","", "title"+this.title.length.toString()));
        }
    }

}