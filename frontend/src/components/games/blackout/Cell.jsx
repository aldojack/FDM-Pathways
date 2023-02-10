function Cell({ cellIndex, isOn, toggleLight }){

    const styles = isOn ? "bg-yellow-300 shadow-lg" : "bg-black"

    function handleToggleLight() {
        toggleLight(cellIndex);
        
    }

    return (
        <button 
            className={`${styles} w-6 h-6 rounded-full border-none m-5`}
            onClick={handleToggleLight}
        ></button>
    );
}

export default Cell;