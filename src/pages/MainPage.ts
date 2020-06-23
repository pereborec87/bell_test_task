import Component from "vue-class-component";
import Vue from "vue";
import Axios, { AxiosResponse, AxiosError } from "axios";
import { IElement, IHistoryAction } from "../decalrations/Interfaces";
import { ActionTypes } from "../decalrations/enums";
import ListElement from "../components/ListElement";

@Component({
    template: require("./MainPage.html"),
    components: {
        "list-element": ListElement
    }
})
export default class MainPage extends Vue {
    public sourceItems: IElement[] = [];
    public targetItems: IElement[] = [];

    private searchStr: string = "";

    mounted(): void {
        const PUBLIC_API_URI = "https://api.jsonbin.io/b/5ef1285197cb753b4d15df1f/3";
        Axios.get(PUBLIC_API_URI)
            .then((response: AxiosResponse) => {
                this.sourceItems = response.data;
            })
            .catch((error: AxiosError) => {
                console.error("Ошибка получения данных.");
            });
    }

    public onAddElement(el: IElement): void {
        let index = this.sourceItems.findIndex((sourceEl: IElement) => {
            return sourceEl.id === el.id;
        });
        if (index !== undefined) {
            this.sourceItems.splice(index, 1);
        }
        this.targetItems.push(el);
        this.addHistoryAction(el, ActionTypes.Add);
    }

    public onRemoveElement(el: IElement): void {
        let index = this.targetItems.findIndex((targetEl: IElement) => {
            return targetEl.id === el.id;
        });
        if (index !== undefined) {
            this.targetItems.splice(index, 1);
        }
        this.sourceItems.push(el);
        this.addHistoryAction(el, ActionTypes.Remove);
    }

    public onChange($event): void {
        this.searchStr = $event.target.value;
        this.sourceItems.forEach((sourceItem: IElement) => {
            sourceItem.matchCount = 0;
            let matchCount = sourceItem.name.split(this.searchStr).length - 1;
            sourceItem.matchCount += matchCount;
            if (sourceItem.items) {
                sourceItem.items.forEach((childItem: IElement) => {
                    let matchCount = sourceItem.name.split(this.searchStr).length - 1;
                    childItem.matchCount += matchCount;
                })
            }
        });
    }

    private addHistoryAction(el: IElement, actionType: ActionTypes): void {
        this.$store.commit("addHistoryAction", <IHistoryAction>{
            name: el.name,
            id: el.id,
            actionType: actionType,
            time: (new Date()).toTimeString()
        });
    }
    
    get filteredItems(): IElement[] {
        if (this.searchStr === "") {
            return this.sourceItems;
        } else {
            let filteredItems = this.sourceItems.filter((sourceItem: IElement) => {
                sourceItem.matchCount = 0;
                sourceItem.name.indexOf(this.searchStr) > -1 && sourceItem.matchCount++;
                if (sourceItem.items) {
                    sourceItem.items.forEach((childItem: IElement) => {
                        childItem.name.indexOf(this.searchStr) > -1 && sourceItem.matchCount++;
                    });
                }

                return sourceItem.matchCount > 0;
            });
            filteredItems.sort((item1: IElement, item2: IElement) => {
                return item1.matchCount > item2.matchCount ? -1 : 1;
            });
            return filteredItems;
        }
    }
}