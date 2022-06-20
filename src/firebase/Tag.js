/* eslint-disable */
import Collection from "./Collection";

export default class extends Collection{
    static collection = 'tags'
    static fields = {
        'name': String
    }

    static async getTags(){
        const tags = await this.getDocuments()
        return tags
    }
}