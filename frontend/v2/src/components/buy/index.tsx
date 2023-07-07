import ValueInput from "../valueInput"
import tokenSelector from "../tokenSelector"

export default function Buy() {
    return (
        <div className="max-md:w-full max-w-2xl p-6 bg-white dark:bg-deep-gray/100 mx-auto">
            <ValueInput
                label="From"
                insideElement={{
                    element: tokenSelector
                }}
            />
            <ValueInput label="To (Estimated)" />
        </div>
    )
}
