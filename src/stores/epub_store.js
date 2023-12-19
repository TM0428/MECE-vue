import { defineStore } from 'pinia'
import { Title, Creator, Publisher, Description, Metadata } from '../js/epub.js';

export const useEpubStore = defineStore('epub', {
    state: () => ({
        title: undefined,
        creators: [],
        publishers: [],
        description: undefined,
        metadata: undefined,
    }),
    actions: {
        reset(){
            this.title = undefined;
            this.creators = [];
            this.publishers = [];
            this.description = undefined;
            this.metadata = undefined;
        },
        createInit(){
            this.title = new Title("", "", "title");
            this.creators = [new Creator("", "", "creator01", 0)];
            this.publishers = [new Publisher("", "", "publisher")];
            this.description = new Description();
            this.metadata = new Metadata();
        },
        addCreator(creator){
            this.creators.push(creator);
        },
        addPublisher(publisher){
            this.publishers.push(publisher);
        },
        setTitle(title){
            this.title = title;
        },
        setDescription(description){
            this.description = description;
        },
        setMetadata(metadata){
            this.metadata = metadata;
        },
    }
})