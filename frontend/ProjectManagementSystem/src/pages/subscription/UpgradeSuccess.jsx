import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { store } from '@/redux/Store'
import { getUserSubscription, upgradeSubscription } from '@/redux/subscription/Action'
import { CheckIcon } from '@radix-ui/react-icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UpgradeSuccess = () => {
    const {subscription} = useSelector(store => store);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(location.search);
    const paymentId = queryParams.get("payment_id");
    const planType = queryParams.get("planType");

    useEffect(() => {
        dispatch(upgradeSubscription({planType}));
        dispatch(getUserSubscription());
    },[]);

  return (
    <div className='flex justify-center'>
        <Card className="mt-20 p-5 space-y-5 flex flex-col items-center">
            <div className='flex items-center gap-4'>
                <CheckIcon className='h-9 w-9 text-green-500' />
                <p className='text-xl'>Plan upgraded Successfully</p>
            </div>
            <div className='space-y-3'>
                <p className='text-green-500'>start date: </p>
                <p className='text-red-500'>end date: </p>
                <p className=''>plan Type: </p>
            </div>
            <Button onClick={() => navigate("/")}>Go to Home</Button>
        </Card>
    </div>
  )
}

export default UpgradeSuccess