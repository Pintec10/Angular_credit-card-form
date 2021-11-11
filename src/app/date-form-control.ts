import { FormControl } from "@angular/forms";

export class DateFormControl extends FormControl {
    //overrides method from FormControl. This method is called every time a new value is set for the form element
    setValue(value: string | null, options: any) {
        //needed to avoid errors on following statements; null comes when form is reset
        if (value === null) {
            super.setValue('', { ...options, emitModelToViewChange: true });
            return;
        }

        //if new value contains something that is not a digit or a slash, just keep the old value
        if (value.match(/[^0-9\/]/gi)) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });    //emitModelToViewChange ensures that the input value is changed also inside the DOM
            return;
        }

        //do not allow any more characters after string reached a length of 5
        if (value.length > 5) {
            super.setValue(this.value, { ...options, emitModelToViewChange: true });
            return;
        }

        //allow deleting the slash with backspace
        if (value.length === 2 && this.value.length === 3) {
            super.setValue(value, { ...options, emitModelToViewChange: true });
            return;
        }

        //after two characters have been introduced, add a slash automatically
        if (value.length === 2) {
            super.setValue(value + '/', { ...options, emitModelToViewChange: true });
            return;
        }

        super.setValue(value, options);
    }
}
