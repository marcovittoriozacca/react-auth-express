export default function({children, onNext, onPrev}){
    return(<>
        <section>
            <div className="flex items-center gap-x-3">
                <button className="p-3 bg-sky-400" onClick={onPrev}>Prev</button>
                <span className="px-3 bg-slate-200 rounded-sm">
                    {children}
                </span>
                <button className="p-3 bg-sky-400" onClick={onNext}>Next</button>

            </div>
        </section>
    </>)
}