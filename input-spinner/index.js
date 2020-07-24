const getTemplate = (initialValue= 0) => {
    return `
        <div class="input_spinner">
            <button data-type="minus">
                ${iconMinus()}
            </button>
            <input type="number" data-type="value" value="${initialValue}" />
            <button data-type="plus">  
                ${iconPlus()}
            </button>
        </div>
    `
}


const iconMinus = () => {
    return `
        <svg className="button-fill"
             width="16"  height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="m0.5 7h14v2h-14z"/>
        </svg>
    `
}

const iconPlus = () => {
    return ` 
        <svg
            width="16" height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="m7 7v-6h2v6h6v2h-6v6h-2v-6h-6v-2z"/>
        </svg>
    `
}

export class InputSpinner {
    constructor(selector, props) {
        this.$el = document.querySelector(selector)
        this.initialValue = props.initialValue
        this.min = props.min
        this.max = props.max

        this.#render()
        this.#setup()
        this.#observe()
    }
    // Private methods
    #render() {
        this.$el.innerHTML = getTemplate(this.initialValue)
    }

    #setup() {
        this.$input = this.$el.querySelector('[data-type="value"]')
        this.$buttonPlus = this.$el.querySelector('[data-type="plus"]')
        this.$buttonMinus = this.$el.querySelector('[data-type="minus"]')

        this.handlePlusClick = this.handlePlusClick.bind(this)
        this.handleMinusClick = this.handleMinusClick.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleInput = this.handleInput.bind(this)

        this.$input.addEventListener('change', this.handleChange)
        this.$input.addEventListener('input', this.handleInput)
        this.$buttonPlus.addEventListener('click', this.handlePlusClick)
        this.$buttonMinus.addEventListener('click', this.handleMinusClick)
    }

    #observe() {
        if(this.$input.value <= this.min) {
            this.$buttonMinus.disabled = true
        } else {
            this.$buttonMinus.disabled = false
        }

        if(this.$input.value >= this.max) {
            this.$buttonPlus.disabled = true
        } else {
            this.$buttonPlus.disabled = false
        }
    }

    #setValue(value) {
        this.$input.value = value
        this.#observe()
    }
    // Handlers
    handlePlusClick() {
        let value = Number(this.$input.value)
        if(value < this.max) {
            value = value + 1
        }
        this.#setValue(value)
    }

    handleMinusClick() {
        let value = Number(this.$input.value)
        if(value > this.min) {
            value = value - 1
        }
        this.#setValue(value)
    }

    handleChange(event) {
        let { value } = event.target
        if(value < this.min) {
            value = this.min
        } else if(value > this.max) {
            value = this.max
        }
        this.#setValue(value)
    }

    handleInput(event) {
        let { value } = event.target
        if(value < this.min) {
            value = this.min
        } else if(value > this.max) {
            value = this.max
        }
        this.#setValue(value)
    }
}