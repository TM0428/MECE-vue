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
        // urn:uuid:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        let uuid = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c){
            let r = Math.random()*16|0, v = c == "x" ? r : (r&0x3|0x8);
            return v.toString(16);
        });
        this.id = "urn:uuid:" + uuid;
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
        this.metadata = new Metadata();
        this.metadata.create_id();
        this.creators = [];
        this.title = [];
        this.publisher = new Publisher("", "");
        this.description = new Description("");
        this.create_title();
        this.create_creator();
    }
    create_title(){
        if(this.title.length == 0){
            this.title = [new Title("", "")];
        }
        else{
            this.title.push(new Title("","", "title"+this.title.length.toString()));
        }
    }
    create_creator(){
        if(this.creators.length == 0){
            this.creators = [new Creator("", "", "aut", 1, "creator01")];
        }
        else{
            // id is creator01, creator02, ...
            let id = "creator" + (this.creators.length + 1).toString().padStart(2, "0");
            this.creators.push(new Creator("", "", "aut", this.creators.length + 1, id));
        }
    }

}