import { Address } from "./Address";
import { CreditCard } from "./CreditCard";

export interface User {
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    telephone: string,
    addresses: Array<Address>,
    creditCards: Array<CreditCard>
}