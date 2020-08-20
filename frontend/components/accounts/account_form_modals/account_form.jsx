
import React, {useState} from 'react'

export default function account_form({passedAccount, formType, errors, processForm, closeModal, deleteAccount, clearAccountErrors}) {
  

  const [account, setAccount] = useState(passedAccount)
  
  const update = (field) => {
    return e => (
      setAccount({...account, [field]: e.currentTarget.value,})
    )
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   processForm(account).then(closeModal(errors));
  // }


  const handleSubmit = (e) => {
    console.log(errors)
    e.preventDefault();
    processForm(account).then(
      () => closeModal()).then(
      () => clearAccountErrors())
  };

  const handleToggle = (e) => {
    e.preventDefault();
    if (account.debit === false) {
      setAccount({...account, debit: true})
    } else {
      setAccount({ ...account, debit: false })
    }
  }

  const handleClose = (e) => {
    e.preventDefault();
    closeModal();
    clearAccountErrors();
  }

  const renderErrors = () => {
    return (
      <ul className="account-form-errors">
        {errors.map((error, i) => (
          <li className="account-form-error" key={i}>{error}</li>
        ))}
      </ul>
    )
  }
  const institutions = [
    'Chase Bank',
    'J.P. Morgan',
    'Bank of America',
    'Merrill Lynch',
    'US Bank',
    'Citibank',
    'Wells Fargo',
    'Charles Schwab',
    'Fidelity',
    'Discover',
    'American Express',
    'Visa',
    'Other',
    'None'
  ]

  const deleteOption = () => {
    if (formType === 'edit') {
      return (
        <span className="edit-delete" onClick={() => deleteAccount(account.id)}>Delete Account</span>
      )
    }
  }


  return (
    <div className="account-form-container">
      <form onSubmit={handleSubmit} className="account-form">
        <div onClick={handleClose} className="close-x">X</div>
        <div className="account-inputs">
          <label>Label:
            <input type="text" value={(account.label)} onChange={update('label')}/>
          </label>
          
          <label>Category:
            <select value={account.account_category} onChange={update('account_category')}>
              <option value="Cash">Cash</option>
              <option value="Credit Cards">Credit Cards</option>
              <option value="Loans">Loans</option>
              <option value="Investments">Investments</option>
              <option value="Property">Property</option>

            </select>
          </label>
          
          <label>Balance:
            <input type="number" min="0" step=".01" value={account.balance} onChange={update('balance')} />
          </label>
          
          <label>Institution:
            <select value={account.institution} onChange={update('institution')}>
              {institutions.map((inst, i) => (
                <option key={i} value={`${inst}`}>{inst}</option>
              ))}
            </select>
          </label>
          <label>Debit?
           
            <input type="checkbox" value={account.debit} onChange={handleToggle} checked={account.debit}/>
          </label>
              <button className="account-form-submit" value={formType}>{formType.toUpperCase()}</button>
          {deleteOption()}
          {renderErrors()}
        </div>
      </form>
    </div>
  )
}

