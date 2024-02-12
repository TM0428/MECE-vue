export class Creator {
    constructor(name="", name_yomi="", role="aut", seq=1, id="creator01", index=0){
        this.name = name;
        this.name_yomi = name_yomi;
        this.role = role;
        this.seq = seq;
        this.id = id;
        this.index = index;
    }
}

export class Title{
    constructor(title="", title_yomi="", id="title"){
        this.title = title;
        this.title_yomi = title_yomi;
        this.id = id;
    }
}

export class Publisher{
    constructor(name="", name_yomi="", id="publisher"){
        this.name = name;
        this.name_yomi = name_yomi;
        this.id = id;
    }
}

export class Description{
    constructor(description=""){
        this.description = description;
    }
}

export class Metadata{
    constructor(language="ja", id, type="comic", modified="2000-01-01T00:00"){
        this.language = language;
        if(id == undefined){
            this.create_id();
        }
        else{
            this.id = id;
        }
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
        this.title = undefined;
        // creators and publisher is array of Creator
        this.creators = [];
        this.publisher = [];
        this.description = undefined;
        this.metadata = undefined;
    }
    createInit(){
        this.title = new Title("", "", "title");
        this.create_creator();
        this.create_publisher();
        this.description = new Description("");
        this.metadata = new Metadata();
    }
    create_publisher(){
        if(this.publisher.length == 0){
            this.publisher = [new Publisher("", "", "publisher")];
        }
        else{
            this.publisher.push(new Publisher("","", "publisher"+this.title.length.toString()));
        }
    }
    create_creator(){
        if(this.creators.length == 0){
            this.creators = [new Creator("", "", "aut", 1, "creator01", 0)];
        }
        else{
            // id is creator01, creator02, ...
            let id = "creator" + (this.creators.length + 1).toString().padStart(2, "0");
            this.creators.push(new Creator("", "", "aut", this.creators.length + 1, id, this.creators.length));
        }
    }

}