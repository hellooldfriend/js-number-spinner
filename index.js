import { InputSpinner } from './input-spinner'
import './input-spinner/styles.scss'

const inputSpinner = new InputSpinner(
    '#input-spinner',
    {
        placeholder: 'Enter the number',
        initialValue: 0,
        min: 0,
        max: 99,
    }
)

window.inputSpinner = inputSpinner