interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const TextInput = ({ label, ...props }: InputProps) => (
    <div className="flex flex-col gap-[0.375rem] mb-3">
        <label className="text-deep-gray/600 dark:text-gray/250 text-sm">
            {label}
        </label>
        <input
            {...props}
            className="
                px-3 py-2 rounded
                bg-white dark:bg-deep-gray/100
                border
                border-default/gray/300
                dark:border-slate/800
                outline-default/gray/300
                dark:outline-slate/800
                focus:outline
                text-sm
                text-brand/secondary/500
                dark:text-brand/primary/500
            "
        />
    </div>
)

export default TextInput
