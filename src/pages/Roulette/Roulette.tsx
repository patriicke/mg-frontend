import React, { useEffect } from 'react'
import RoulettePopup from '../../components/Roulette/RoulettePopup';
import useDialog from 'hooks/useDialog';

const Roulette = () => {
  const { showDialog } = useDialog();

  useEffect(() => {
    showDialog(<RoulettePopup />)
  })
  return (
    <div className='h-[50vh]'>
      {/* <h1 className='text-4xl w-full text-center'>Coming Soon...</h1> */}
    </div>
  )
}

export default Roulette