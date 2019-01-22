import React from 'react';

const Header = ({ list, isOpen, filterLanguage, toggleDropdown }) => {
    return (
        <header>
            <div className='logo'>Logo</div>
            <div className='dropdown'>
                <button onClick={toggleDropdown}>
                    Language
                </button>
                <div className='dropdown-list'>
                    { isOpen && list.map((eachList, i) => (
                        <label htmlFor={eachList} key={i}>
                            <input type="checkbox" id={eachList} onChange={(e) => filterLanguage(e)} />
                            {eachList}
                        </label>
                    ))}
                </div>
            </div>
        </header>
    )
};

export default Header;