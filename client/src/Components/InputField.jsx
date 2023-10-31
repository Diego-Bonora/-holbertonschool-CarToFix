export default function InputField({ icon, type, placeholder, value, onChange }) {
    return (
        <div className="relative mb-1 my-2 mt-2 2g text-lg">
            {icon && (
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-9 h-15 text-color-icons">
                    {icon}
                </div>
            )}
            <input 
                type={type} 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange} 
                className="rounded-b-2xl rounded-t-2xl xl:text-lg h-7 my-1.5 w-full bg-gris-claro text-black py-5 p-14 placeholder-white" 
            />
        </div>
    );
}
