const icons = {
    threeDots: <svg className="w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g strokeWidth="0"></g>
        <g strokeLinecap="round" strokeLinejoin="round"></g>
        <g>
            <path d="M13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
        </g>
    </svg>,
    expanses: <svg className="w-full h-full" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
        <path d="M3 20.4V3.6C3 3.26863 3.26863 3 3.6 3H20.4C20.7314 3 21 3.26863 21 3.6V20.4C21 20.7314 20.7314 21 20.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" strokeWidth="1.5"></path>
        <path d="M15 8.5C14.315 7.81501 13.1087 7.33855 12 7.30872M9 15C9.64448 15.8593 10.8428 16.3494 12 16.391M12 7.30872C10.6809 7.27322 9.5 7.86998 9.5 9.50001C9.5 12.5 15 11 15 14C15 15.711 13.5362 16.4462 12 16.391M12 7.30872V5.5M12 16.391V18.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>,
    groups: <svg className="w-full h-full" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
        <path d="M1 20V19C1 15.134 4.13401 12 8 12V12C11.866 12 15 15.134 15 19V20" strokeWidth="1.5" strokeLinecap="round"></path>
        <path d="M13 14V14C13 11.2386 15.2386 9 18 9V9C20.7614 9 23 11.2386 23 14V14.5" strokeWidth="1.5" strokeLinecap="round"></path>
        <path d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M18 9C19.6569 9 21 7.65685 21 6C21 4.34315 19.6569 3 18 3C16.3431 3 15 4.34315 15 6C15 7.65685 16.3431 9 18 9Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>,
    overview: <svg className="w-full h-full" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
        <path d="M3 7.4V3.6C3 3.26863 3.26863 3 3.6 3H9.4C9.73137 3 10 3.26863 10 3.6V7.4C10 7.73137 9.73137 8 9.4 8H3.6C3.26863 8 3 7.73137 3 7.4Z" strokeWidth="1.5"></path>
        <path d="M14 20.4V16.6C14 16.2686 14.2686 16 14.6 16H20.4C20.7314 16 21 16.2686 21 16.6V20.4C21 20.7314 20.7314 21 20.4 21H14.6C14.2686 21 14 20.7314 14 20.4Z" strokeWidth="1.5"></path>
        <path d="M14 12.4V3.6C14 3.26863 14.2686 3 14.6 3H20.4C20.7314 3 21 3.26863 21 3.6V12.4C21 12.7314 20.7314 13 20.4 13H14.6C14.2686 13 14 12.7314 14 12.4Z" strokeWidth="1.5"></path>
        <path d="M3 20.4V11.6C3 11.2686 3.26863 11 3.6 11H9.4C9.73137 11 10 11.2686 10 11.6V20.4C10 20.7314 9.73137 21 9.4 21H3.6C3.26863 21 3 20.7314 3 20.4Z" strokeWidth="1.5"></path>
    </svg>,
    country: <svg className="w-full h-full" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
        <path d="M15.8189 13.3287L10.4948 19.3183C9.69924 20.2134 8.30076 20.2134 7.50518 19.3183L2.18109 13.3287C1.50752 12.571 1.50752 11.429 2.18109 10.6713L7.50518 4.68167C8.30076 3.78664 9.69924 3.78664 10.4948 4.68167L15.8189 10.6713C16.4925 11.429 16.4925 12.571 15.8189 13.3287Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M12 6.375L13.5052 4.68167C14.3008 3.78664 15.6992 3.78664 16.4948 4.68167L21.8189 10.6713C22.4925 11.429 22.4925 12.571 21.8189 13.3287L16.4948 19.3183C15.6992 20.2134 14.3008 20.2134 13.5052 19.3183L12 17.625" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>,
    settings: <svg className="w-full h-full" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"></path>
        <path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M19.6224 10.3954L18.5247 7.7448L20 6L18 4L16.2647 5.48295L13.5578 4.36974L12.9353 2H10.981L10.3491 4.40113L7.70441 5.51596L6 4L4 6L5.45337 7.78885L4.3725 10.4463L2 11V13L4.40111 13.6555L5.51575 16.2997L4 18L6 20L7.79116 18.5403L10.397 19.6123L11 22H13L13.6045 19.6132L16.2551 18.5155C16.6969 18.8313 18 20 18 20L20 18L18.5159 16.2494L19.6139 13.598L21.9999 12.9772L22 11L19.6224 10.3954Z"></path>
    </svg>,
    back: <svg className="w-full h-full" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
        <path d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>,
    refresh: <svg className="w-full h-full" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
        <path d="M21.1679 8C19.6247 4.46819 16.1006 2 11.9999 2C6.81459 2 2.55104 5.94668 2.04932 11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M2.88146 16C4.42458 19.5318 7.94874 22 12.0494 22C17.2347 22 21.4983 18.0533 22 13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M7.04932 16H2.64932C2.31795 16 2.04932 16.2686 2.04932 16.6V21" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
}


export default icons;