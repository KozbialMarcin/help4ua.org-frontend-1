import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { route } from '@/app/router/urls/routes'
import NoticeDetailsItem from '@/views/notices/View_Notices/NoticeDetailsItem'

export const transportSearchColumns = () => {
  const {t} = useTranslation()
  return [
    {
      name: t('common.imie'),
      selector: ({ name }) => name,
    },
    {
      name: t('common.telefon'),
      selector: ({ phoneNumber }) => <a href={`tel:${phoneNumber}`} className="font-bold text-blue-700 hover:text-blue-500">{phoneNumber}</a>,
    },
    {
      name: t('common.miejsca'),
      selector: ({ accommodationPlacesCount }) => accommodationPlacesCount ? accommodationPlacesCount : '-',
    },
    {
      name: t('form.transportFromStr'),
      selector: ({transportFromStr }) => transportFromStr,
    },
    {
      name: t('form.transportToStr'),
      selector: ({transportToStr }) => transportToStr,
    },  
    {
      name: t('common.opis'),
      selector: ({ description }) => description?.slice(0, 100)
    },
  ];
}

export const TransportSearchExpandedComponent = ({data: {
  description,
  descriptionUA,
  id,
  name,
  phoneNumber,
  createdAt,
  transportToStr,
  transportFromStr,
}}) => {
  const { t } = useTranslation();
  return (
    <div className="text-sm text-center bg-white dark:bg-gray-900 text-black dark:text-gray-400 rounded shadow p-3 mb-4">
      <div className="flex gap-5">
        <div className="flex-1">
          {!!description && <NoticeDetailsItem label={t("common.opis")} value={description}/>}
          {!!descriptionUA && <NoticeDetailsItem label={t("common.opisUA")} value={descriptionUA}/>}
          {!!name && <NoticeDetailsItem label={t("common.imie")} value={name}/>}
          {!!phoneNumber && <NoticeDetailsItem label={t("common.telefon")} value={ <a href={`tel:${phoneNumber}`} className="font-bold text-blue-700 hover:text-blue-500">{phoneNumber}</a>}/>}
          {!!transportFromStr && <NoticeDetailsItem label="Transport z:" value={transportFromStr}/>}
          {!!transportToStr && <NoticeDetailsItem label="Transport do:" value={transportToStr}/>}          
          {!!createdAt && <NoticeDetailsItem label={t("common.data")} value={dayjs(createdAt).format('DD.MM.YYYY HH:mm')}/>}
          {!!id && <NoticeDetailsItem label="Identyfikator ogłoszenia:" value={id}/>}
          <NoticeDetailsItem label={t("common.uniqueLink")} value={<Link to={route['notices.view'](id)} className="text-blue-700 hover:text-blue-500 inline-block font-bold">Link</Link>}/>
        </div>
      </div>
    </div>
  )
}