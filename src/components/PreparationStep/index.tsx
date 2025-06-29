interface PreparationSetpProps {
    index: number;
    description: string;
}

export default function PreparationStep({index, description}: PreparationSetpProps){
    return (
        <li className="flex gap-2">
            <span className="flex items-center justify-center bg-blue-100 w-6 h-6 rounded-full text-blue-500 flex-shrink-0">{index}</span>
            <p>{description}</p>
        </li>
    )
}