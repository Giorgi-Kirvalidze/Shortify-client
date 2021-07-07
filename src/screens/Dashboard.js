import React, { useEffect, useState } from 'react'
import Chart from '../components/Chart'
import Input from '../components/Input'
import { shortenUrl } from '../actions/url.actions'
import { useDispatch, useSelector } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { isUrl } from '../helpers/validateUrl'
import { getUrlsById } from '../actions/user.actions'

const Dashboard = () => {
    const [url, setUrl] = useState('')
    const [setCopy] = useState(false)
    const dispatch = useDispatch()
    const urlData = useSelector(state => state.url.urlData)
    const userData = useSelector(state => state.account.user)
    const userId = userData.id
    const shortUrl = urlData.shortUrl
    const linksVisited = useSelector(state => state.account.linksVisited)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!url && isUrl(url) === false) {
            return
        }
        return dispatch(shortenUrl(url, userId))
    }
    useEffect(() => {
        console.log('page reloaded')
    }, [])

    function handleCopy() {
        return setCopy(true)
    }

    async function handleClick() {
        return (
            dispatch(shortenUrl(urlData.originUrl, userId)),
            dispatch(getUrlsById(userId))
        )
    }

    function getUrls() {
        return dispatch(getUrlsById(userId))
    }
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    useEffect(() => {
        if (urlData === undefined) {
            return
        }
        dispatch(shortenUrl(urlData.originUrl, userId))
        // eslint-disable-next-line
    }, [dispatch, url])
    return (
        <>
            <div className="dashboard">
                <div>
                    <Chart />
                    <form onSubmit={handleSubmit}>
                        <Input type="text" onChange={(e) => setUrl(e.target.value)} placeholder="Enter url" className="form__input" />
                        <button className="btn" type="submit">Shorten</button>
                    </form>
                    <div>
                        {shortUrl ?
                            <div style={{ marginTop: '50px' }}>
                                <CopyToClipboard text={shortUrl}
                                    onCopy={handleCopy}>
                                    <button className="btn" style={{ marginRight: '30px' }}>Copy</button>
                                </CopyToClipboard>
                                < a style={{ color: '#fff', textDecoration: 'none' }} onClick={handleClick} target="_blank" rel="noreferrer" href={shortUrl}>{shortUrl}</a>
                            </div>

                            : null
                        }
                    </div>
                </div>
                <div>
                    <div>
                        <button className="btn" onClick={getUrls}>Show links i visited</button>
                    </div>
                    <h2>{`${capitalizeFirstLetter(userData.firstName)}, you have visited :`}</h2>
                    {linksVisited.map((val, index) => (
                        <div key={index}>
                            {index + 1} :  {val}
                        </div>
                    ))}
                </div>
            </div >
        </>
    )
}

export default Dashboard
