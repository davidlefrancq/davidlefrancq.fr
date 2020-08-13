import Occurrence from "../bo/Occurrence";
import {OCCURRENCE_EXPERIENCE, OCCURRENCE_QUALIFICATION} from "../components/Occurrence/occurence-type";

class OccurrencesUtils {

    static getClosestToYear(occurence1, occurence2, year) {
        let occurence = null;

        const dateControl = new Date(`${year}-12-31T23:59:59`);
        const date1 = OccurrencesUtils.getDate(occurence1);
        const date2 = OccurrencesUtils.getDate(occurence2);

        if (date1 == null || date2 == null) {
            if (date1 != null) {
                occurence = occurence1;
            }
            if (date2 != null) {
                occurence = occurence2;
            }
        } else {
            const diff1 = Math.abs(dateControl - date1);
            const diff2 = Math.abs(dateControl - date2);

            if (diff1 <= diff2) {
                occurence = occurence1;
            } else {
                occurence = occurence2;
            }
        }

        return occurence;
    }

    static getOccurrenceClosestToYear(occurrences, year) {
        const experience = OccurrencesUtils.getExperienceByYear(occurrences, year);
        const qualification = OccurrencesUtils.getQualificationByYear(occurrences, year);
        const occurrence = OccurrencesUtils.getClosestToYear(experience, qualification, year);
        return occurrence;
    }


    static getExperienceByYear(occurrences, year) {

        let experienceOccurence = null;

        for (const key in occurrences) {

            const occurrence = occurrences[key];
            if (Occurrence.isExperience(occurrence)) {

                if (experienceOccurence == null) {
                    experienceOccurence = occurrence;
                } else {

                    const dateControl = new Date(`${year}-12-31T23:59:59`);
                    const dateOccurrence = OccurrencesUtils.getDate(occurrence);
                    const dateSelected = OccurrencesUtils.getDate(experienceOccurence);

                    if (dateOccurrence <= dateControl || dateSelected > dateControl) {

                        const dateExperience = OccurrencesUtils.getDate(experienceOccurence);
                        if (dateOccurrence > dateExperience) {

                            experienceOccurence = occurrence;

                        } else {
                            if (dateExperience > dateControl) {

                                experienceOccurence = occurrence;
                            }
                        }
                    }
                }
            }
        }

        return experienceOccurence;
    }

    static getExperiences(occurrences) {
        const experinceOccurences = [];

        for (const id in occurrences) {
            const occurrence = occurrences[id];
            if (Occurrence.isExperience(occurrence)) {
                experinceOccurences.push(occurrence);
            }
        }

        experinceOccurences.sort(OccurrencesUtils.occurrenceSort);
        return experinceOccurences;
    }

    static getQualificationByYear(occurrences, year) {

        let qualificationOccurence = null;

        for (const id in occurrences) {

            const occurrence = occurrences[id];
            if (Occurrence.isQualification(occurrence)) {

                if (qualificationOccurence == null) {

                    qualificationOccurence = occurrence;

                } else {
                    const dateControl = new Date(`${year}-12-31T23:59:59`);
                    const dateOccurrence = OccurrencesUtils.getDate(occurrence);
                    const dateSelected = OccurrencesUtils.getDate(qualificationOccurence);

                    if (dateOccurrence <= dateControl || dateSelected > dateControl) {

                        const dateQualification = OccurrencesUtils.getDate(qualificationOccurence);
                        if (dateOccurrence > dateQualification) {

                            qualificationOccurence = occurrence;
                        } else {
                            if (dateQualification > dateControl) {

                                qualificationOccurence = occurrence;
                            }
                        }
                    }
                }
            }
        }

        return qualificationOccurence;
    }

    static getQualifications(occurrences) {
        const qualificationOccurences = [];

        for (const id in occurrences) {
            const occurrence = occurrences[id];
            if (Occurrence.isQualification(occurrence)) {
                qualificationOccurences.push(occurrence);
            }
        }

        qualificationOccurences.sort(OccurrencesUtils.occurrenceSort);
        return qualificationOccurences;
    }

    static occurrenceSort(a, b) {
        let result = 0;

        let dateA = null;
        let dateB = null;

        if (a.dateStart) {
            dateA = a.dateStart;
        }
        if (b.dateStart) {
            dateB = b.dateStart
        }
        if (a.dateEnd) {
            dateA = a.dateEnd;
        }
        if (b.dateEnd) {
            dateB = b.dateEnd
        }

        if (dateA != null && dateB != null) {
            if (dateA < dateB) {
                result = -1;
            }

            if (dateA > dateB) {
                result = 1;
            }
        }

        if (dateA != null && dateB == null) {
            result = 1;
        }

        if (dateA == null && dateB != null) {
            result = -1;
        }

        return result;
    }

    static getType(occurrence) {
        let curentType = null;

        if (Occurrence.isExperience(occurrence)) {
            curentType = OCCURRENCE_EXPERIENCE;
        } else if (Occurrence.isQualification(occurrence)) {
            curentType = OCCURRENCE_QUALIFICATION;
        }

        return curentType;
    }

    static getDate(occurrence) {

        let date = null;

        if (occurrence != undefined && occurrence != null) {
            const {dateStart, dateEnd} = occurrence;

            if (dateStart != undefined && dateStart != null) {
                date = new Date(dateStart);
            }

            if (dateEnd != undefined && dateEnd != null) {
                date = new Date(dateEnd);
            }
        }

        return date;
    }
}

export default OccurrencesUtils;