import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class PasswordValidators{
    static match(controlName: string, checkControlName: string): ValidatorFn{
        return (controls: AbstractControl) => {
            const control = controls.get(controlName);
            const checkControl = controls.get(checkControlName);

            if(checkControl?.errors && checkControl?.errors['matching'])
                return null;
            
            if(control?.value !== checkControl?.value){
                controls.get(checkControlName)?.setErrors({matching: true})
                return { matching: true};
            } else 
                return null;
        }
    }

    static strenght(control: AbstractControl): ValidationErrors | null{
        let value = control.value || '';

        if(!value)
            return null;

        let uppperCaseRule = /[A-Z]+/g

        if(uppperCaseRule.test(value) === false)
            return { strenght: `Password must contain at least one upper case character` }

        let numberRule = /[0-9]+/g

        if(numberRule.test(value) === false)
            return { strenght: `Password must contain at least one number character` }

        let specialCharRule = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

        if(specialCharRule.test(value) === false)
            return { strenght: `Password must contain at least one special character` } 

        return null;
    }
}