export default ()=>{
    return <>
    
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <circle fill="#22c55e" stroke="#22c55e"  r="7" cx="40" cy="65">
            <animate attributeName="cy" calcMode="spline" dur="1.3" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4">
            </animate>
        </circle>

        <circle fill="#22c55e" stroke="#22c55e"  r="7" cx="100" cy="65">
            <animate attributeName="cy" calcMode="spline" dur="1.3" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2">
            </animate>
        </circle>

        <circle fill="#22c55e" stroke="#22c55e"  r="7" cx="160" cy="65">
            <animate attributeName="cy" calcMode="spline" dur="1.3" values="65;135;65;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0">
            </animate>
        </circle>


    </svg>  
    
        
    </>
}