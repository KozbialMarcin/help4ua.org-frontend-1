import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider } from 'react-hook-form'
import {
  FaUser,
  FaPhone,
  FaBed,
  FaClock,
  FaComment,
  FaUsers,
  FaEnvelope,
  FaMapPin,
  FaDoorClosed, FaCheck,
} from 'react-icons/fa'
import { InputText } from '@/components/form/Input_Text'
import { InputCheckbox } from '@/components/form/Input_Checkbox'
import { InputSelect } from '@/components/form/Input_Select'
import { InputTextarea } from '@/components/form/Input_Textarea'
import { useHookFormMutation } from '../../../../app/hooks/useHookFormMutation'
import { InputSubmit } from '@/components/form/Input_Submit'
import { HookFormError } from '@/components/form/HookFormError'
import { periodsEnum } from '@/app/config/enum/periods'
import { voivodeshipsEnum } from '@/app/config/enum/voivodeships'
import { useTranslation } from 'react-i18next'
import { InputRodo } from '@/components/form/Input_RODO'
import { useEffect, useMemo } from 'react'
import { useSelector } from 'react-redux'

const FormAddShelterOffer = ({defaultValues, query, onSuccess, editMode=false}) => {
  const schema = useMemo(() => yup.object().shape({
    name: yup.string().required(),
    description: yup.string().nullable(),
    region: yup.number().required(),
    cityName: yup.string().required(),
    phoneNumber: yup.string().required(),
    email: yup.string().email().nullable(),
    roomCount: yup.string().nullable(),
    bedCount: yup.string().nullable(),
    accommodationPlacesCount: yup.string().required(),
    isAcceptedChild: yup.string().nullable(),
    isAcceptedAnimal: yup.string().nullable(),
    hasWashingMachine: yup.string().nullable(),
    isCatering: yup.string().nullable(),
    isDelivery: yup.string().nullable(),
    type: yup.number().default(1),
    acceptTerms: editMode ? yup.string() : yup.string().required(),
    period: yup.string().required(),
    language: yup.string().nullable(),
  }), [editMode]);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues]);

  const {t} = useTranslation();
  
  const mutation = useHookFormMutation(methods, query, {onSuccess});
  
  return (
    <FormProvider {...methods}>
      <form onSubmit={mutation.mutate}>
        <HookFormError/>
        <h4 className="font-bold">{t("form.personalInfo")}</h4>
        <div className="flex-grow border-t border-gray-300 mb-4"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
          <div>
            <InputText
              name="name"
              label={t("form.name")}
              icon={FaUser}
              required
            />
          </div>
          <div>
            <InputText
              name="phoneNumber"
              label={t("form.phoneNumber")}
              icon={FaPhone}
              required
            />
          </div>
          <div>
            <InputText
              name="email"
              label={t("form.email")}
              icon={FaEnvelope}
            />
          </div>
          <div>
            <InputSelect
              name="region"
              label={t("form.voivodeship")}
              options={voivodeshipsEnum(a => a)}
              required
            />
          </div>
          <div>
            <InputText
              name="cityName"
              label={t("form.cityName")}
              icon={FaMapPin}
              required
            />
          </div>
        </div>
        <h4 className="font-bold mt-8">{t("form.accommodation")}</h4>
        <div className="flex-grow border-t border-gray-300 mb-4"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
          <div>
            <InputText
              name="roomCount"
              type="number"
              min={0}
              label={t("form.roomCount")}
              icon={FaDoorClosed}
            />
          </div>
          <div>
            <InputText
              name="bedCount"
              type="number"
              min={0}
              label={t("form.bedCount")}
              icon={FaBed}
            />
          </div>
          <div>
            <InputText
              name="accommodationPlacesCount"
              type="number"
              min={0}
              label={t("form.accommodationPlacesCount")}
              icon={FaUsers}
              required
            />
          </div>
          <div>
            <InputSelect
              name="period"
              label={t("form.period")}
              icon={FaClock}
              options={periodsEnum(t)}
              required
            />
          </div>
        </div>
        <h4 className="font-bold mt-8">Szczegóły</h4>
        <div className="flex-grow border-t border-gray-300 mb-4"/>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
          <div>
            <InputCheckbox
              name="isAcceptedChild"
              label={t("form.hasAcceptedChild")}
            />
          </div>
          <div>
            <InputCheckbox
              name="isAcceptedAnimal"
              label={t("form.hasAcceptedAnimal")}
            />
          </div>
          <div>
            <InputCheckbox
              name="isCatering"
              label={t("form.hasCatering")}
            />
          </div>
          <div>
            <InputCheckbox
              name="isDelivery"
              label={t("form.hasDelivery")}
            />
          </div>
          <div>
            <InputCheckbox
              name="hasWashingMachine"
              label={t("form.hasWashingMachine")}
            />
          </div>
        </div>
        <h4 className="font-bold mt-8">{t("form.extraInfo")}</h4>
        <div className="flex-grow border-t border-gray-300 mb-4"/>
        <div>
          <InputTextarea
            name="description"
            label={t("form.description")}
            icon={FaComment}
          />
        </div>
        {!editMode && (
          <div className="flex justify-end">
            <div className="w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mt-8">
              <InputRodo/>
            </div>
          </div>
        )}
        <div className="flex justify-end pt-5">
          <InputSubmit
            icon={<FaCheck/>}
            value={t(editMode ? "form.save" : "form.send")}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default FormAddShelterOffer;