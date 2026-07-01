"use client";
import { postMoviePrefrence } from "@/api/api";
import { Formik } from "formik";
import * as Yup from "yup";

const MoviePrefrence = ({ setMovies, setLoading }) => {
    const validationSchema = Yup.object({
        genre: Yup.string().required("Genre is required"),
        mood: Yup.string().required("Mood is required"),
        userPrompt: Yup.string().required("Movie expectation is required"),
        count: Yup.number()
            .required("Number of movies is required")
            .min(1, "Minimum 1 movie required"),
        type: Yup.string().required("Industry is required"),
    });

    return (
        <div className="col-span-12 lg:col-span-3">
            <Formik
                initialValues={{
                    genre: "",
                    mood: "",
                    userPrompt: "",
                    count: "",
                    type: "",
                }}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setLoading(true)
                    try {
                        const data = await postMoviePrefrence(values);
                        setMovies(data?.movies);
                        setLoading(false);
                    } catch (error) {
                        console.log(error);
                        setLoading(false);
                    } finally {
                        setSubmitting(false);
                        setLoading(false);
                    }
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(e);
                        }}
                    >
                        <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 sticky top-6">
                            <h2 className="text-xl font-semibold mb-6">Movie Preferences</h2>

                            {/* Genre + Mood */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                <div>
                                    <label className="block mb-2 text-sm text-gray-300 font-bold">
                                        Genre *
                                    </label>
                                    <select
                                        className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none text-sm"
                                        name="genre"
                                        onChange={handleChange}
                                        value={values.genre}
                                    >
                                        <option value="">Select Genre</option>
                                        <option>Action</option>
                                        <option>Comedy</option>
                                        <option>Thriller</option>
                                        <option>Romance</option>
                                        <option>Sci-Fi</option>
                                    </select>
                                    {touched.genre && errors.genre && (
                                        <p className="text-red-500 text-xs mt-1">{errors.genre}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-300 font-bold">
                                        Mood *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Excited, Sad"
                                        className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none text-sm"
                                        name="mood"
                                        onChange={handleChange}
                                        value={values.mood}
                                    />
                                    {touched.mood && errors.mood && (
                                        <p className="text-red-500 text-xs mt-1">{errors.mood}</p>
                                    )}
                                </div>
                            </div>

                            {/* Movie Expectations */}
                            <div className="mb-5">
                                <label className="block mb-2 text-sm text-gray-300 font-bold">
                                    Your Movie Expectations *
                                </label>
                                <textarea
                                    rows={2}
                                    placeholder="Describe what kind of movie experience you want..."
                                    className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none resize-none text-sm"
                                    name="userPrompt"
                                    onChange={handleChange}
                                    value={values.userPrompt}
                                />
                                {touched.userPrompt && errors.userPrompt && (
                                    <p className="text-red-500 text-xs mt-1">{errors.userPrompt}</p>
                                )}
                            </div>

                            {/* Count + Industry */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">

                                <div>
                                    <label className="block mb-2 text-sm text-gray-300 font-bold">
                                        Number of Movies *
                                    </label>

                                    <select
                                        name="count"
                                        onChange={handleChange}
                                        value={values.count}
                                        className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none text-sm"
                                    >
                                        <option value="">Select number</option>
                                        <option value="3">3 Movies</option>
                                        <option value="5">5 Movies</option>
                                        <option value="10">10 Movies</option>
                                        <option value="12">12 Movies</option>
                                        <option value="15">15 Movies</option>
                                    </select>

                                    {touched.count && errors.count && (
                                        <p className="text-red-500 text-xs mt-1">{errors.count}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-300 font-bold">
                                        Industry *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Hollywood, Bollywood"
                                        className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 outline-none text-sm"
                                        name="type"
                                        onChange={handleChange}
                                        value={values.type}
                                    />
                                    {touched.type && errors.type && (
                                        <p className="text-red-500 text-xs mt-1">{errors.type}</p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-700 transition rounded-lg py-3 font-bold cursor-pointer"
                            >
                                Pick Movies
                            </button>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default MoviePrefrence;