import React from "react";
import NewForms from "./newForms";

export default class FormBody extends React.Component {
    render() {
        const {type, activity} = this.props;

        if(!type || !activity) {
            return null;//don't render if previous fields not selected
        }

        if(activity === "new") {
            return (
                <NewForms type={type} />
            )
        }
        

        return (
            <>
                TODO
            </>
        )
    }
}