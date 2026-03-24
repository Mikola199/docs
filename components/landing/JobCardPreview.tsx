type EmploymentType = 'full-time' | 'part-time' | 'shift'

type JobCardData = {
  title: string
  company: string
  companyInitials: string
  location: {
    city: string
    cityMapUrl: string
    isRemote: boolean
  }
  salary: {
    min: number
    max: number
    currency: 'USD'
  }
  employmentTypes: Array<EmploymentType>
  applyUrl: string
}

const EMPLOYMENT_TYPE_META: Record<EmploymentType, { label: string; icon: string }> = {
  'full-time': { label: 'Полная занятость', icon: '💼' },
  'part-time': { label: 'Частичная занятость', icon: '🕒' },
  shift: { label: 'Вахта', icon: '🛠️' },
}

const JOB_CARD_DATA: JobCardData = {
  title: 'Senior Frontend Engineer',
  company: 'Acme Tech',
  companyInitials: 'AT',
  location: {
    city: 'Berlin',
    cityMapUrl: 'https://www.openstreetmap.org/search?query=Berlin',
    isRemote: true,
  },
  salary: {
    min: 5500,
    max: 7500,
    currency: 'USD',
  },
  employmentTypes: ['full-time', 'part-time', 'shift'],
  applyUrl: '#apply',
}

function formatSalaryRange({ min, max, currency }: JobCardData['salary']) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(min) +
    ' – ' +
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(max)
}

function isHighPay({ max }: JobCardData['salary']) {
  return max >= 7000
}

export function JobCardPreview() {
  const highPay = isHighPay(JOB_CARD_DATA.salary)

  return (
    <section className="container-xl px-3 px-md-6 mb-6" aria-label="Превью карточки вакансии">
      <div className="mb-3">
        <h2 className="h3 mb-1">Пример интеграции карточки вакансии</h2>
        <p className="color-text-secondary mb-0">
          Визуал показывает приоритетную иерархию: название, компания, локация, зарплата, типы
          занятости и CTA.
        </p>
      </div>

      <div className="border rounded-2 p-4 p-md-5 color-bg-default box-shadow-medium">
        <div className="d-flex flex-justify-between flex-items-start flex-wrap">
          <div className="mr-3">
            <h3 className="h2 text-bold mb-2">{JOB_CARD_DATA.title}</h3>
            <div className="d-flex flex-items-center mb-2">
              <div
                className="circle color-bg-accent-emphasis color-fg-on-emphasis d-flex flex-items-center flex-justify-center text-small text-semibold"
                style={{ width: '28px', height: '28px' }}
                aria-label={`Логотип компании ${JOB_CARD_DATA.company}`}
              >
                {JOB_CARD_DATA.companyInitials}
              </div>
              <span className="ml-2 text-semibold">{JOB_CARD_DATA.company}</span>
            </div>
            <div className="d-flex flex-wrap">
              <a
                href={JOB_CARD_DATA.location.cityMapUrl}
                target="_blank"
                rel="noreferrer"
                className="IssueLabel mr-2 mb-2"
              >
                {JOB_CARD_DATA.location.city} (карта)
              </a>
              {JOB_CARD_DATA.location.isRemote && <span className="IssueLabel mb-2">Remote</span>}
            </div>
          </div>

          <div className="mt-3 mt-md-0">
            <p className="text-small color-text-secondary mb-1">Заработок</p>
            <p className={`h3 mb-2 ${highPay ? 'color-text-success' : ''}`}>
              {formatSalaryRange(JOB_CARD_DATA.salary)}
            </p>
            {highPay && <span className="IssueLabel IssueLabel--accent">High pay</span>}
          </div>
        </div>

        <hr className="my-4" />

        <div className="d-flex flex-wrap flex-items-center flex-justify-between">
          <div className="d-flex flex-wrap flex-items-center mb-3 mb-md-0">
            {JOB_CARD_DATA.employmentTypes.map((type) => (
              <span key={type} className="IssueLabel mr-2 mb-2">
                <span aria-hidden="true">{EMPLOYMENT_TYPE_META[type].icon}</span>{' '}
                {EMPLOYMENT_TYPE_META[type].label}
              </span>
            ))}
          </div>

          <a href={JOB_CARD_DATA.applyUrl} className="btn btn-primary">
            Откликнуться
          </a>
        </div>

        <div className="mt-3">
          <div
            className="color-bg-accent-emphasis color-fg-on-emphasis text-center py-2 rounded-1 text-small"
            style={{ position: 'sticky', bottom: '1rem', zIndex: 10 }}
          >
            CTA остается видимой при скролле
          </div>
        </div>

        <p id="apply" className="mt-3 mb-0 color-text-secondary text-small">
          Зона отклика: здесь может быть открыта форма отправки резюме.
        </p>
      </div>
    </section>
  )
}
