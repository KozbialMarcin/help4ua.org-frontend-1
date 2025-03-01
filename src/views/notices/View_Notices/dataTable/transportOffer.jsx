import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { voivodeshipsEnum } from '@/app/config/enum/voivodeships'
import { Link } from 'react-router-dom'
import { route } from '@/app/router/urls/routes'
import { FaMapMarked } from 'react-icons/all'
import { FaPhone } from 'react-icons/fa'
import { useState } from 'react'

export const transportOfferColumns = () => {
  const {t} = useTranslation()
  return [
    {
      name: t('common.imie'),
      selector: ({ name }) => name,
    },
    {
      name: t('common.telefon'),
      selector: ({ phoneNumber }) => phoneNumber,
    },
    {
      name: t('common.miejsca'),
      selector: ({ accommodationPlacesCount }) => accommodationPlacesCount ? accommodationPlacesCount : '-',
    },
    {
      name: t('common.opis'),
      selector: ({ description }) => description?.slice(0, 100)
    },
  ];
} 

const Item = ({label, value}) => {
  return (
    <div className="py-2 flex gap-2">
      <span className="">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  )
}


export const TransportOfferExpandedComponent = ({data: {
  description,
  descriptionUA,
  id,
  name,
  phoneNumber,
  createdAt,
}}) => {
  const { t } = useTranslation();
  return (
    <div className="border-b p-4 text-sm bg-[#fafafa] text-center">
      <div className="flex gap-5">
        <div className="flex-1">
          {!!description && <Item label={t('common.opis')} value={description}/>}
          {!!descriptionUA && <Item label={t("common.opisUA")} value={descriptionUA}/>}
          {!!name && <Item label={t('common.imie')} value={name}/>}
          {!! phoneNumber &&<Item label={t('common.telefon')} value={phoneNumber}/>}
          {!! createdAt &&<Item label={t('common.data')} value={dayjs(createdAt).format('DD.MM.YYYY HH:mm')}/>}
          {!! id &&<Item label={t('common.id')} value={id}/>}
        </div>
      </div>
      <Link to={route['notices.view'](id)} className="text-blue-500 hover:text-blue-300 mt-5 inline-block font-bold">Link</Link>
    </div>
  )
}

export const TransportOfferItem = ({
  description,
  cityName,
  region,
  address,
  bedCount,
  isAcceptedChild,
  isAcceptedAnimal,
  hasWashingMachine,
  period,
  isCatering,
  isDelivery,
  location,
  id,
  name,
  accommodationPlacesCount,
  phoneNumber,
  createdAt,
}) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-300 mb-2 text-sm overflow-hidden shadow">
      <div className="px-3 py-2 bg-gray-100 flex rounded-t-lg">
        <div className="w-1/3 flex">
          Miejsca: <strong className="ml-1.5">{accommodationPlacesCount ?? '-'}</strong>
        </div>
        <div className="w-1/3 flex">
          <FaPhone className="mr-1.5 mt-0.5"/> <strong>{phoneNumber}</strong>
        </div>
        <div className="w-1/3 flex">
          <strong className="ml-1.5">{name}</strong>
        </div>
      </div>
      <div className="px-3 py-2 text-gray-700 text-xs whitespace-pre-wrap max-w-full">
        <Desc>
          {description}
        </Desc>
        <div className="text-gray-400 text-xs -mb-2 mt-2 text-right">
          {t('common.id')}: {id}
        </div>
      </div>
    </div>
  );
}

const Desc = ({children:description = ''}) => {
  const [show, setShow] = useState(false);
  if(!description || description?.length < 140) return description;
  return (<>
    {!show ? (
      description.substring(0,140) + '...'
    ) : (
      description
    )}
    <span
      className="text-blue-900 hover:text-blue-800 cursor-pointer underline px-2"
      onClick={()=>setShow(!show)}
    >
      {show ? (
        'ukryj'
      ) : (
        'więcej'
      )}
    </span>
  </>)
}