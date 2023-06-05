
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="md:w-5/12 mx-auto text-center my-8">
            <p className="text-yellow-600 mb-2 text-lg font-semibold">---{subHeading}---</p>
            <h3 className="text-4xl font-semibold uppercase border-y-4 py-4 border-base-300">{heading}</h3>
            
        </div>
    );
};

export default SectionTitle;