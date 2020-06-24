import Component from "vue-class-component";
import Vue from "vue";
import { Prop } from "vue-property-decorator";
import { Route } from "vue-router";
import { IHistoryAction, IState } from "../decalrations/Interfaces";
import { ActionTypes } from "../decalrations/enums";

@Component({
    template: require("./HistoryPage.html")
})
export default class HistoryPage extends Vue {
    @Prop()
    action: string;

    public actions: IHistoryAction[] = [];

    created(): void {
        this.$router.afterEach((to: Route, from: Route) => {
            if (to.params && to.params.action) {
                this.applyActionType(to.params.action);
            }
        });
    }

    mounted(): void {
        if (this.$router.currentRoute.params && this.$router.currentRoute.params.action) {
            this.applyActionType(this.$router.currentRoute.params.action);
        }
    }

    private applyActionType(actionType: string): void {
            this.actions = (<IState>this.$store.state).actions;
            switch (actionType) {
                case ActionTypes.All: {
                    break;
                }
                case ActionTypes.Add: {
                    this.actions = this.actions.filter((action: IHistoryAction) => {
                        return action.actionType === ActionTypes.Add;
                    });
                    break;
                }
                case ActionTypes.Remove: {
                    this.actions = this.actions.filter((action: IHistoryAction) => {
                        return action.actionType === ActionTypes.Remove;
                    });
                    break;
                }
            }
    }
}
