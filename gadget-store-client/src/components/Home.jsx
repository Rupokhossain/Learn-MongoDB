import React, { useState } from 'react'
import { useLoaderData } from 'react-router'
import GadgetCard from './GadgetCard';

const Home = () => {

    const initialGadget = useLoaderData();

    const [gadgets, setGadgets] = useState(initialGadget);

  return (
    <div>
        <div>
            {
                gadgets.map(gadget => <GadgetCard
                    key={gadget._id}
                    gadgets={gadgets}
                    setGadgets={setGadgets}
                    gadget={gadget}
                >
                </GadgetCard>)
            }
        </div>
    </div>
  )
}

export default Home