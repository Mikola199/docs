export function JobCardPreview() {
  return (
    <section className="container-xl px-3 px-md-6 mb-6" aria-label="Превью карточки вакансии">
      <div className="border rounded-2 p-4 p-md-5 color-bg-default box-shadow-medium">
        <div className="d-flex flex-justify-between flex-items-start flex-wrap">
          <div className="mr-3">
            <h2 className="h2 text-bold mb-2">Senior Frontend Engineer</h2>
            <div className="d-flex flex-items-center mb-2">
              <div
                aria-hidden="true"
                className="circle color-bg-accent-emphasis"
                style={{ width: '28px', height: '28px' }}
              />
              <span className="ml-2 text-semibold">Acme Tech</span>
            </div>
            <div className="d-flex flex-wrap">
              <span className="IssueLabel mr-2 mb-2">Berlin</span>
              <span className="IssueLabel mb-2">Remote</span>
            </div>
          </div>

          <div className="mt-3 mt-md-0">
            <p className="text-small color-text-secondary mb-1">Заработок</p>
            <p className="h3 color-text-success mb-2">$5,500 – $7,500</p>
            <span className="IssueLabel IssueLabel--accent">High pay</span>
          </div>
        </div>

        <hr className="my-4" />

        <div className="d-flex flex-wrap flex-items-center flex-justify-between">
          <div className="d-flex flex-items-center mb-3 mb-md-0">
            <span className="mr-3" aria-hidden="true">
              💼
            </span>
            <span>Полная занятость</span>
          </div>

          <button type="button" className="btn btn-primary">
            Откликнуться
          </button>
        </div>

        <div className="mt-3">
          <div
            className="color-bg-accent-emphasis color-fg-on-emphasis text-center py-2 rounded-1 text-small"
            style={{ position: 'sticky', bottom: '0' }}
          >
            CTA остается видимой при скролле
          </div>
        </div>
      </div>
    </section>
  )
}
