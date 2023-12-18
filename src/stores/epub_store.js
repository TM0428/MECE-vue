import { defineStore } from 'pinia'
// import { Title, Creator, Publisher, Description, Metadata } from '../js/epub.js';

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