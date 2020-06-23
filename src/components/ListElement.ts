import Component from "vue-class-component";
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import { IElement } from "../decalrations/Interfaces";
import { ElementType } from "../decalrations/enums";

@Component({
    name: "list-element",
    template: require("./ListElement.html")
})
export default class ListElement extends Vue {
    @Prop()
    element: IElement;
    @Prop()
    elementType: ElementType;

    public expanded: boolean = false;

    onRemoveElement(element: IElement): void {
        this.$emit("remove", element);
    }

    onAddElement(element: IElement): void {
        this.$emit("add", element);
    }

    onExpandRow(): void {
        this.expanded = !this.expanded;
    }

    getTogglerClass(): string {
        return this.expanded ? "expand-toggler" : "collapse-toggler" ;
    }
}