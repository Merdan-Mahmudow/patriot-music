import BaseCard from "./BaseCard";
import ExtendedCard from "./ExtendedCard";
import PremiumCard from "./PremiumCard";
import "./index.css";


interface CardProps {
    plan: 'base' | 'extended' | 'premium';
}

export default function Card({plan}: CardProps) {
    if (plan === 'base') {
       return <BaseCard/>
    } else if (plan === 'extended'){
        return <ExtendedCard/>
    } else if (plan === 'premium'){
        return <PremiumCard/>
    } else {
        return null;
    }
}