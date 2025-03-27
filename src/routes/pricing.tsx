import { createFileRoute } from '@tanstack/react-router'
import ButtonBack from '../components/ButtonBack';
import { useEffect } from 'react';
import Card from '../components/Cards';

export const Route = createFileRoute('/pricing')({
  component: Pricing,
})

function Pricing() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
      <div className='pb-10 px-3'>
        <ButtonBack to='/' />
        <Card plan='base' />
        <Card plan='extended' />
        <Card plan='premium' />
      </div>
  );
}
